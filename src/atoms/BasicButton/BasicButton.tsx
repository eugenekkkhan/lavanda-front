import { ButtonHTMLAttributes, ReactNode } from 'react'

export interface BasicButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode
	isWide?: boolean
	size?: 'sm' | 'base' | 'lg'
	theme?: 'primary' | 'outline-light' | 'outline-dark' | 'ghost'
}

const BasicButton = ({
	children,
	className = '',
	isWide = false,
	size = 'base',
	theme = 'outline-light',
	...props
}: BasicButtonProps) => {
	const base =
		'pt-[10px] w-fit pb-[12px] text-base text-lg rounded-[21px] transition-colors'

	const themeMap = {
		'primary': 'bg-white text-purple-400 shadow-[inset_0_0_0_1px_#ffffff]',
		'outline-light': 'bg-transparent text-white shadow-[inset_0_0_0_1px_#ffffff] hover:bg-white hover:text-purple-400',
		'outline-dark': 'bg-transparent text-black shadow-[inset_0_0_0_1px_#000000] hover:bg-black/70 hover:text-[#ECFFE8]',
		'ghost': 'bg-transparent text-black shadow-[inset_0_0_0_1px_#000000]'
	}

	const paddingXMap = {
		sm: 'px-3',
		base: 'px-6',
		lg: 'px-10',
	}

	const paddingX = paddingXMap[size] || paddingXMap.base
	const themeStyle = themeMap[theme] || themeMap['outline-light']
	return (
		<button
			className={`${base} ${themeStyle} ${paddingX} ${isWide ? 'w-full' : ''} ${className}`}
			{...props}
		>
			{children}
		</button>
	)
}

export default BasicButton
