import { API_V1 } from '@/Utils/constants';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useForm } from '@inertiajs/react';

const CreateChoiceForm = ({ question }) => {
	const { data, setData, post, processing, errors, reset } = useForm({
		value: '',
		label: '',
	});

	const handleSubmit = e => {
		e.preventDefault();
		post(`${API_V1}/questions/${question.id}/choices`, {
			onSuccess: () => reset('value', 'label'),
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
				<div className='sm:col-span-1 sm:col-start-1'>
					<label
						htmlFor='value'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Value
					</label>
					<div className='mt-2'>
						<input
							type='text'
							name='value'
							id='value'
							value={data.value}
							onChange={e => setData('value', e.target.value)}
							className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
						/>
					</div>
					{errors.value && (
						<div className='mt-1 pl-2 text-red-500'>
							{errors.value}
						</div>
					)}
				</div>
				<div className='sm:col-span-3'>
					<label
						htmlFor='label'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Label
					</label>
					<div className='mt-2'>
						<input
							type='text'
							name='label'
							id='label'
							value={data.label}
							onChange={e => setData('label', e.target.value)}
							className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
						/>
					</div>
					{errors.label && (
						<div className='mt-1 pl-2 text-red-500'>
							{errors.label}
						</div>
					)}
				</div>
				<div className='content-end sm:col-span-2'>
					<button
						type='submit'
						className='rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						disabled={processing}
					>
						<PlusIcon className='h-5 w-5' aria-hidden='true' />
					</button>
				</div>
			</div>
		</form>
	);
};

export default CreateChoiceForm;
