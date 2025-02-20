import SurveyLayout from '@/Layouts/SurveyLayout';
import SurveyForm from './Partial/SurveyForm';
import QuestionsIndex from './Question/QuestionsIndex';

const Show = ({ pageTitle, survey }) => {
	const questions = survey.questions;

	return (
		<SurveyLayout pageTitle={pageTitle}>
			<div className='mb-8 border-b-8 pb-8'>
				<SurveyForm formAction='update' survey={survey} />
			</div>

			<QuestionsIndex survey={survey} questions={questions} />
		</SurveyLayout>
	);
};

export default Show;
