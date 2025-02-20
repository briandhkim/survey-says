import LinkButtonPrimary from '@/Components/LinkButtonPrimary';
import SurveyLayout from '@/Layouts/SurveyLayout';
import { API_V1 } from '@/Utils/constants';
import { formatDistance } from 'date-fns';

const ResponseIndex = ({ pageTitle, survey }) => {
	const { responses } = survey;
	return (
		<SurveyLayout pageTitle={pageTitle}>
			<div className='mb-10'>
				<h2 className='font-mono text-xl font-extrabold'>
					Responses for "{survey.title}"
				</h2>
			</div>
			<div>
				{responses.length ? (
					<ul
						role='list'
						className='divide-y divide-dashed divide-gray-400'
					>
						{responses.map(response => (
							<li
								key={response.id}
								className='flex justify-between gap-x-6 py-5'
							>
								<div className='flex min-w-0 gap-x-4'>
									<div className='min-w-0 flex-auto'>
										<p className='text-sm font-semibold leading-6 text-gray-900'>
											Response {response.id}
										</p>
										<p className='mt-1 truncate text-xs leading-5 text-gray-500'>
											Submitted:{' '}
											{formatDistance(
												new Date(response.created_at),
												new Date(),
												{ addSuffix: true }
											)}
										</p>
									</div>
								</div>
								<div className='hidden shrink-0 space-y-2 sm:flex sm:flex-col sm:items-end'>
									<LinkButtonPrimary
										href={`${API_V1}/surveys/${survey.id}/responses/${response.id}`}
									>
										View answers
									</LinkButtonPrimary>
								</div>
							</li>
						))}
					</ul>
				) : (
					<div>
						<p className='italic text-orange-500'>
							Responses have not been submitted for this survey
							yet
						</p>
					</div>
				)}
			</div>
		</SurveyLayout>
	);
};

export default ResponseIndex;
