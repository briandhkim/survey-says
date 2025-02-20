<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Survey;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SurveyAnswerController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Survey $survey)
    {
        return Inertia::render('Survey/Answer/AnswerIndex', [
            'pageTitle' => $survey->title,
            'survey' => $survey->load('questions.choices'),
        ]);
    }
}
