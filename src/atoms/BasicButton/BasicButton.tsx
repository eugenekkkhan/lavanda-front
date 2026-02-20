import { ButtonHTMLAttributes, ReactNode } from 'react'

export interface BasicButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode
	isWide?: boolean
	size?: 'sm' | 'base' | 'lg'
}

const BasicButton = ({
	children,
	className = '',
	isWide = false,
	size = 'base',
	...props
}: BasicButtonProps) => {
	const base =
		'pt-[10px] w-fit pb-[12px] text-base bg-transparent text-lg rounded-[21px] shadow-[inset_0_0_0_1px_var(--color-secondary)] text-secondary hover:bg-secondary hover:text-primary  transition-color'

	const paddingXMap = {
		sm: 'px-3',
		base: 'px-6',
		lg: 'px-10',
	}

	const paddingX = paddingXMap[size] || paddingXMap.base
	return (
		<button
			className={`${className} ${base} ${paddingX} ${isWide ? 'w-full' : ''} `}
			{...props}
		>
			{children}
		</button>
	)
}

export default BasicButton
