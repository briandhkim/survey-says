<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Survey;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Survey/Index', [
            'pageTitle' => 'Surveys',
            'surveys' => Survey::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Survey/Create', [
            'pageTitle' => 'Create new survey',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $survey = Survey::create($validated);

        return to_route('surveys.show', ['survey' => $survey]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey)
    {
        return Inertia::render('Survey/Show', [
            'pageTitle' => "Edit '$survey->title'",
            'survey' => $survey->load('questions'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Survey $survey)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Survey $survey)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $survey->update($validated);

        return to_route('surveys.show', ['survey' => $survey]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Survey $survey)
    {
        //
    }
}
