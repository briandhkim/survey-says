import LinkButtonPrimary from '@/Components/LinkButtonPrimary';
import { API_V1 } from '@/Utils/constants';
import { formatDistance } from 'date-fns';

const QuestionList = ({ questions, survey }) => {
	return (
		<ul role='list' className='divide-y divide-dashed divide-gray-400'>
			{questions.map(question => (
				<li
					key={question.id}
					className='flex justify-between gap-x-6 py-5'
				>
					<div className='flex min-w-0 gap-x-4'>
						<div className='min-w-0 flex-auto'>
							<p className='text-sm font-semibold leading-6 text-gray-900'>
								{question.title}
							</p>
							<p className='mt-1 truncate text-xs leading-5 text-gray-500'>
								Created:{' '}
								{formatDistance(
									new Date(question.created_at),
									new Date(),
									{ addSuffix: true }
								)}
							</p>
							<p className='mt-1 truncate text-xs leading-5 text-gray-500'>
								Updated:{' '}
								{formatDistance(
									new Date(question.updated_at),
									new Date(),
									{ addSuffix: true }
								)}
							</p>
						</div>
					</div>
					<div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
						<LinkButtonPrimary
							href={`${API_V1}/surveys/${survey.id}/questions/${question.id}`}
						>
							Edit
						</LinkButtonPrimary>
						<p className='mt-1 text-xs leading-5 text-gray-500'>
							placeholder
						</p>
					</div>
				</li>
			))}
		</ul>
	);
};

export default QuestionList;
