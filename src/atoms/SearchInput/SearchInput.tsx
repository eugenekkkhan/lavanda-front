import { InputHTMLAttributes } from 'react'
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";


interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement>{
	placeholder?:string
}

const SearchInput = ({ placeholder='Поиск', className = ''}:SearchInputProps) => {
	return (
		<div className="inline-flex items-center justify-center gap-2">
		<CiSearch />
		<input className={`${className}`} type="text" placeholder={placeholder} />
		<RxCross1 />
		</div>
	)
}

export default SearchInput
