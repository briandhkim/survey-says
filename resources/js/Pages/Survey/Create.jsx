import SurveyLayout from '@/Layouts/SurveyLayout';
import SurveyForm from './Partial/SurveyForm';

const Create = ({ pageTitle }) => {
	return (
		<SurveyLayout pageTitle={pageTitle}>
			<SurveyForm formAction='create' />
		</SurveyLayout>
	);
};

export default Create;
