import SurveyLayout from '@/Layouts/SurveyLayout';

const AnswerReceived = ({ pageTitle, survey }) => {
	return (
		<SurveyLayout pageTitle={pageTitle}>
			<div className='min-h-96'>
				<h2 className='font-mono text-xl font-extrabold'>
					Your response for "{survey.title}" has been received.
				</h2>
			</div>
		</SurveyLayout>
	);
};

export default AnswerReceived;
