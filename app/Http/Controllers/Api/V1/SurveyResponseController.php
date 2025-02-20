<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Response;
use App\Models\Survey;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SurveyResponseController extends Controller
{
    public function received(Survey $survey)
    {
        return Inertia::render('Survey/Answer/AnswerReceived', [
            'pageTitle' => 'Response submitted',
            'survey' => $survey,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Survey $survey)
    {
        return Inertia::render('Survey/Response/ResponseIndex', [
            'pageTitle' => 'Survey responses',
            'survey' => $survey->load('responses'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Survey $survey)
    {
        $validationRules = $survey->questions
            ->map(function ($question) {
                return ["question_$question->id" => 'required|array'];
            })->mapWithKeys(function ($questionRule) {
                return $questionRule;
            })->toArray();

        $validated = collect($request->validate($validationRules));

        $response = $survey->responses()->create();

        $validated->map(function ($answers, $question) use ($response) {
            $questionId = (int) str_replace('question_', '', $question);
            collect($answers)->map(function ($answer) use ($response, $questionId) {
                $response
                    ->answers()
                    ->create([
                        'input' => $answer,
                        'question_id' => $questionId,
                    ]);
            });
        });

        return to_route('api.v1.survey.response.received', ['survey' => $survey]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey, Response $response)
    {
        $response->load('answers.question');

        $answers = $response->answers->mapToGroups(function ($answer) {
            return [$answer->question->title => $answer->input];
        });

        return Inertia::render('Survey/Response/ResponseShow', [
            'pageTitle' => "Answers for '$survey->title' submission $response->id",
            'survey' => $survey,
            'response' => $response,
            'answers' => $answers,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
