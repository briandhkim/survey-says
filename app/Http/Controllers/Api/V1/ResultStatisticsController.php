<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ResultStatisticsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Survey $survey, string $mood)
    {
        $data = [];
        $message = null;

        if ($survey->title !== 'Step 1 survey') {
            $message = "Survey '$survey->title' doesn't have this data.";
        } else {
            $targetQuestion = 'Are you happy?';
            $targetResponse = $mood === 'happy' ? 'Yes' : 'No';

            $answers = collect(
                $this->queryAnswersByHappiness($targetQuestion, $targetResponse)
            );
            // $questions = $answers->pluck('question')->unique()->flatten();

            if (count($answers)) {
                $groupedAnswers = $answers->groupBy(['question', 'count']);
                foreach ($groupedAnswers as $question => $answer) {
                    $data[$question] = $answer[array_key_first($answer->toArray())];
                }
            } else {
                $message = 'No data to display';
            }
        }

        return Inertia::render('Survey/Stats/StatsIndex', [
            'pageTitle' => "Popular answers picked by '$mood' people",
            'survey' => $survey,
            'answers' => $data,
            'message' => $message,
        ]);
    }

    private function queryAnswersByHappiness($targetQuestion, $targetResponse)
    {
        return DB::select(
            '
            select 
                q.title `question`, a.input, count(a.id) `count`
            from 
                answers a
                join questions q on q.id = a.question_id 
            where 
                a.response_id in (
                    select 
                        r.id
                    from responses r
                    join answers a2 on a2.response_id = r.id
                    join questions q2 on q2.id = a2.question_id
                    where
                        q2.title = :question_title
                    and a2.input = :question_answer
                )
            group by 
                q.title
                , a.input
            order by 
                q.title,
                count(a.id) desc
            ',
            [
                'question_title' => $targetQuestion,
                'question_answer' => $targetResponse,
            ]
        );
    }
}
