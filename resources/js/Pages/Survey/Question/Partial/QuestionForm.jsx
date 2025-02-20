import { API_V1 } from '@/Utils/constants';
import { classNames } from '@/Utils/helpers';
import { Link, useForm } from '@inertiajs/react';

const QuestionForm = ({ formAction = 'create', survey, question = null }) => {
	const { data, setData, post, put, processing, errors, isDirty } = useForm({
		title: question?.title ?? '',
		type: question?.type ?? '',
	});

	const handleSubmit = e => {
		e.preventDefault();
		question
			? put(`${API_V1}/surveys/${survey.id}/questions/${question.id}`)
			: post(`${API_V1}/surveys/${survey.id}/questions`);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='space-y-12'>
				<div className='border-b border-gray-900/10 pb-12'>
					<h2 className='text-base font-semibold leading-7 text-gray-900'>
						{formAction === 'create'
							? 'Add a question'
							: 'Edit question'}
					</h2>

					<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
						<div className='sm:col-span-4'>
							<label
								htmlFor='title'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Question title
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
										placeholder="What's the question?"
									/>
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

				<div className='border-b border-gray-900/10 pb-12'>
					<div className='mt-10 space-y-10'>
						<fieldset>
							<legend className='text-sm font-semibold leading-6 text-gray-900'>
								Question type
							</legend>
							<p className='mt-1 text-sm leading-6 text-gray-600'>
								Choose between a radio or checkbox input
							</p>
							<div className='mt-6 space-y-6'>
								<div className='flex items-center gap-x-3'>
									<input
										id='type-radio'
										name='question-type'
										type='radio'
										className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
										value='radio'
										checked={data.type === 'radio'}
										onChange={e =>
											setData('type', e.target.value)
										}
									/>
									<label
										htmlFor='type-radio'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										Radio
									</label>
								</div>
								<div className='flex items-center gap-x-3'>
									<input
										id='type-checkbox'
										name='question-type'
										type='radio'
										className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
										value='checkbox'
										checked={data.type === 'checkbox'}
										onChange={e =>
											setData('type', e.target.value)
										}
									/>
									<label
										htmlFor='type-checkbox'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										Checkbox
									</label>
								</div>
							</div>
							{errors.type && (
								<div className='mt-2 pl-2 text-red-500'>
									{errors.type}
								</div>
							)}
						</fieldset>
					</div>
				</div>
			</div>

			<div className='mt-6 flex items-center justify-end gap-x-6'>
				<Link
					href={`${API_V1}/surveys/${survey.id}`}
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

export default QuestionForm;
