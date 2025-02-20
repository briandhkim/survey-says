import SurveyLayout from '@/Layouts/SurveyLayout';
import { useEffect } from 'react';

const ResponseShow = ({ pageTitle, response, answers }) => {
	useEffect(() => {
		// console.log(response);
		// console.log(answers);
	}, []);

	return (
		<SurveyLayout pageTitle={pageTitle}>
			<div className='mb-10'>
				<h2 className='font-mono text-xl font-extrabold'>
					Answers for Response {response.id}
				</h2>
			</div>
			<div>
				<ul role='list' className='space-y-3'>
					{Object.keys(answers).map(question => (
						<li
							key={question}
							className='overflow-hidden rounded-md bg-white px-6 py-4 shadow'
						>
							<h3 className='mb-4 text-lg'>
								<small className='mr-2 text-sm'>Q.</small>
								<span className='font-bold'>{question}</span>
							</h3>

							<dl className='divide-y divide-gray-100'>
								{answers[question].map((answer, idx) => (
									<div
										key={answer}
										className={`${idx % 2 ? 'bg-white' : 'bg-gray-200'} px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3`}
									>
										<dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
											{answer}
										</dd>
									</div>
								))}
							</dl>
						</li>
					))}
				</ul>
			</div>
		</SurveyLayout>
	);
};

export default ResponseShow;
