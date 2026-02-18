import { InputHTMLAttributes } from 'react'
import { CiSearch } from 'react-icons/ci'
import { RxCross1 } from 'react-icons/rx'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
	placeholder?: string
}

const SearchInput = ({
	placeholder = 'Поиск',
	className = '',
}: SearchInputProps) => {
	return (
		<div className='border-b-[1px] border-white w-fit mx-3'>

			<div className='flex items-center justify-between gap-1 p-3'>
		
				<CiSearch color='white' size={24} />
				<input
					className={`${className} bg-transparent text-white text-base focus:outline-none flex-1 mx-2`}
					type='text'
					placeholder={placeholder}
				/>
				<RxCross1 color='white' size={24} className='cursor-pointer' />
			</div>
		</div>
	)
}

export default SearchInput
