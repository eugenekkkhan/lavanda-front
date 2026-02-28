import { CiSearch } from 'react-icons/ci'
import { RxCross1 } from 'react-icons/rx'

interface SearchInputProps {
	placeholder?: string
	value: string
	onChange: (text: string) => void
	onClear?: () => void
	className?: string
}
//найти более подходящую иконку для лупы
const SearchInput = ({
	placeholder = 'Поиск',
	className = '',
	onChange,
	onClear,
	value,
}: SearchInputProps) => {
	return (
		<div className='border-b-[1px] border-secondary w-auto md:w-fit mx-4 md:mx-3'>
			<div className='flex items-center justify-between pt-3 pb-2  px-3'>
				<CiSearch color='var(--color-secondary)' size={24} />
				<input
					className={`${className} bg-transparent text-secondary text-base focus:outline-none w-full mx-2`}
					type='text'
					placeholder={placeholder}
					value={value}
					onChange={e => onChange(e.target.value)}
				/>

				{value && (
					<RxCross1
						color='var(--color-secondary)'
						size={24}
						className='cursor-pointer'
						onClick={onClear}
					/>
				)}
			</div>
		</div>
	)
}

export default SearchInput
