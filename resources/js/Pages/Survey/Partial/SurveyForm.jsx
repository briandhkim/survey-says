import { API_V1 } from '@/Utils/constants';
import { classNames } from '@/Utils/helpers';
import { Link, useForm } from '@inertiajs/react';

const SurveyForm = ({ formAction = 'create', survey = null }) => {
	const { data, setData, post, put, processing, errors, isDirty } = useForm({
		title: survey?.title ?? '',
	});

	const handleSubmit = e => {
		e.preventDefault();
		survey
			? put(`${API_V1}/surveys/${survey.id}`)
			: post(`${API_V1}/surveys`);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='space-y-12'>
				<div className='border-b border-gray-900/10 pb-12'>
					<h2 className='text-base font-semibold leading-7 text-gray-900'>
						{formAction === 'create'
							? 'New survey'
							: 'Update survey'}
					</h2>
					<p className='mt-1 text-sm leading-6 text-gray-600'>
						{formAction === 'create'
							? 'You can add questions after creating the survey'
							: 'Update and add questions for the survey'}
					</p>

					<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
						<div className='sm:col-span-4'>
							<label
								htmlFor='title'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Title
							</label>
							<div className='mt-2'>
								<div className='flex rounded-md bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
									<input
										type='text'
										name='title'
										id='title'
										value={data.title}
										onChange={e =>
											setData('title', e.target.value)
										}
										className='block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
										placeholder='Survey title'
									/>
								</div>
							</div>
							{errors.title && (
								<div className='mt-1 pl-2 text-red-500'>
									{errors.title}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className='mt-6 flex items-center justify-end gap-x-6'>
				<Link
					href={`${API_V1}/surveys`}
					as='button'
					type='button'
					className='text-sm font-semibold leading-6 text-gray-900'
				>
					{formAction === 'create' ? 'Cancel' : 'Back'}
				</Link>
				<button
					type='submit'
					className={classNames(
						isDirty
							? 'bg-indigo-600 hover:bg-indigo-500'
							: 'bg-neutral-500',
						'rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					)}
					disabled={processing}
				>
					{formAction === 'create' ? 'Create' : 'Update'}
				</button>
			</div>
		</form>
	);
};

export default SurveyForm;
