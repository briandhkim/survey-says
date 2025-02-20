import SurveyLayout from '@/Layouts/SurveyLayout';
import QuestionForm from './Partial/QuestionForm';

const CreateQuestion = ({ pageTitle, survey }) => {
	return (
		<SurveyLayout pageTitle={pageTitle}>
			<QuestionForm formAction='create' survey={survey} />
		</SurveyLayout>
	);
};

export default CreateQuestion;
