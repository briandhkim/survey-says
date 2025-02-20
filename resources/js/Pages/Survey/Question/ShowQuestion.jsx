import SurveyLayout from '@/Layouts/SurveyLayout';
import CreateChoiceForm from './Partial/CreateChoiceForm';
import QuestionForm from './Partial/QuestionForm';
import UpdateChoiceForm from './Partial/UpdateChoiceForm';

const ShowQuestion = ({ pageTitle, survey, question }) => {
	return (
		<SurveyLayout pageTitle={pageTitle}>
			<div className='mb-8 border-b-8 pb-8'>
				<QuestionForm
					formAction='update'
					survey={survey}
					question={question}
				/>
			</div>
			<div className='space-y-8'>
				<div className=''>
					<h2 className='text-base font-semibold leading-7 text-gray-900'>
						Choices
					</h2>
				</div>
				<CreateChoiceForm question={question} />
				<div className='space-y-4'>
					{question.choices.map(choice => (
						<UpdateChoiceForm
							key={choice.id}
							question={question}
							choice={choice}
						/>
					))}
				</div>
			</div>
		</SurveyLayout>
	);
};

export default ShowQuestion;
