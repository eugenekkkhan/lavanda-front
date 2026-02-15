import { ButtonHTMLAttributes, ReactNode } from 'react'

export interface BasicButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode
  isWide?: boolean 
}

const BasicButton = ({
	children,
	className = '',
  isWide = false,
	...props
}: BasicButtonProps) => {
  const base = 'w-[171px] h-[42px] text-lg bg-[#BDB2FF] rounded-[21px] border-[1px] text-white font-medium hover:bg-white hover:text-[#BDB2FF] border-[#FFFFFC] transition-color'
	return (
		<button className={`${className} ${base} ${isWide ? 'w-full' : ''} `} {...props}>
			{children}
		</button>
	)
}

export default BasicButton
