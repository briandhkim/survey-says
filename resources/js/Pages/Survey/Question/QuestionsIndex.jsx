import LinkButtonPrimary from '@/Components/LinkButtonPrimary';
import { API_V1 } from '@/Utils/constants';
import {
	ClipboardDocumentListIcon,
	PlusIcon,
} from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';
import QuestionList from './Partial/QuestionList';

const QuestionsIndex = ({ survey, questions }) => {
	return (
		<div>
			<h2 className='text-base font-semibold leading-7 text-gray-900'>
				Questions
			</h2>
			<p className='mt-1 text-sm leading-6 text-gray-600'>
				Add and edit questions
			</p>
			<div className='mt-4'>
				<LinkButtonPrimary
					href={`${API_V1}/surveys/${survey.id}/questions/create`}
				>
					New question
					<PlusIcon className='-mr-0.5 h-5 w-5' aria-hidden='true' />
				</LinkButtonPrimary>
			</div>
			<div className='mt-8'>
				{questions.length ? (
					<QuestionList questions={questions} survey={survey} />
				) : (
					<div className='text-center'>
						<ClipboardDocumentListIcon
							className='mx-auto h-12 w-12 text-neutral-400'
							aria-hidden='true'
						/>
						<h3 className='mt-2 text-sm font-semibold text-gray-900'>
							No questions
						</h3>
						<p className='mt-1 text-sm text-gray-500'>
							Add questions for the survey
						</p>
						<div className='mt-6'>
							<Link
								href={`${API_V1}/surveys/${survey.id}/questions/create`}
								as='button'
								type='button'
								className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								New question
								<PlusIcon
									className='ml-1.5 h-5 w-5'
									aria-hidden='true'
								/>
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default QuestionsIndex;
