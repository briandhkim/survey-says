<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Choice;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionChoiceController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Question $question)
    {
        $validated = $request->validate([
            'value' => 'required|string|max:255',
            'label' => 'required|string|max:255',
        ]);

        $question->choices()->create($validated);

        return to_route('api.v1.survey.question.show', ['survey' => $question->survey, 'question' => $question]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Question $question, Choice $choice)
    {
        $validated = $request->validate([
            'value' => 'required|string|max:255',
            'label' => 'required|string|max:255',
        ]);

        $choice->update($validated);

        return to_route('api.v1.survey.question.show', ['survey' => $question->survey, 'question' => $question]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
