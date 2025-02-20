<?php

use App\Http\Controllers\Api\V1\QuestionChoiceController;
use App\Http\Controllers\Api\V1\ResultStatisticsController;
use App\Http\Controllers\Api\V1\SurveyAnswerController;
use App\Http\Controllers\Api\V1\SurveyController;
use App\Http\Controllers\Api\V1\SurveyQuestionsController;
use App\Http\Controllers\Api\V1\SurveyResponseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/test', function (Request $request) {
    return 'test abc';
});

Route::name('api.v1.')->middleware('auth')->group(function () {
    Route::resource('surveys', SurveyController::class)->only(['index', 'show', 'create', 'store', 'update']);

    Route::resource('surveys/{survey}/questions', SurveyQuestionsController::class)
        ->only(['create']);
    Route::get('/surveys/{survey}/questions/{question}', [SurveyQuestionsController::class, 'show'])
        ->name('survey.question.show');
    Route::post('/surveys/{survey}/questions', [SurveyQuestionsController::class, 'store']);
    Route::put('/surveys/{survey}/questions/{question}', [SurveyQuestionsController::class, 'update']);

    Route::post('/questions/{question}/choices', [QuestionChoiceController::class, 'store']);
    Route::put('/questions/{question}/choices/{choice}', [QuestionChoiceController::class, 'update']);

    Route::get('/surveys/{survey}/answer', SurveyAnswerController::class)->name('survey.answer');
    Route::get('/surveys{survey}/responses/received', [SurveyResponseController::class, 'received'])->name('survey.response.received');

    Route::get('/surveys/{survey}/responses', [SurveyResponseController::class, 'index']);

    Route::get('/surveys/{survey}/responses', [SurveyResponseController::class, 'index']);
    Route::get('/surveys/{survey}/responses/{response}', [SurveyResponseController::class, 'show'])->name('survey.response.show');
    Route::post('/surveys/{survey}/responses', [SurveyResponseController::class, 'store']);

    Route::get('/surveys/{survey}/stats/{mood}', ResultStatisticsController::class);
});
