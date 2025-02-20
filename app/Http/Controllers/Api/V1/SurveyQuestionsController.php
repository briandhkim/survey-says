<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Survey;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SurveyQuestionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Survey $survey)
    {
        return Inertia::render('Survey/Question/CreateQuestion', [
            'pageTitle' => "Add a question for '$survey->title'",
            'survey' => $survey,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Survey $survey)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|in:radio,checkbox',
        ]);

        $question = $survey->questions()->create($validated);

        return to_route('api.v1.survey.question.show', ['survey' => $survey, 'question' => $question]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey, Question $question)
    {
        return Inertia::render('Survey/Question/ShowQuestion', [
            'pageTitle' => "Edit question '$question->title'",
            'survey' => $survey,
            'question' => $question->load('choices'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Survey $survey, Question $question)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|in:radio,checkbox',
        ]);

        $question->update($validated);

        return to_route('api.v1.survey.question.show', ['survey' => $survey, 'question' => $question]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
