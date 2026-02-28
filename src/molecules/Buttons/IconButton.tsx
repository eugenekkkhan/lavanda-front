import BasicButton, {
	BasicButtonProps,
} from '../../atoms/BasicButton/BasicButton'
import { IconType } from 'react-icons'

interface IconButtonProps extends BasicButtonProps {
	icon: IconType
	iconSize?: number | string
	iconClassName?: string
	side?: 'left' | 'right'
}

const IconButton = ({
	children,
	icon: Icon,
	iconSize = 25,
	iconClassName = '',
	className = '',
	side = 'left',
	...props
}: IconButtonProps) => {
	return (
		<BasicButton
			className={`flex items-center justify-center gap-2 ${className}`}
			{...props}
		>
			{side === 'left' && (
				<Icon size={iconSize} className={iconClassName+ " -my-[4px] -ml-[4px]"} />
			)}

			{children}

			{side === 'right' && (
				<Icon size={iconSize} className={iconClassName+ " -my-[4px] -mr-[4px]"} />
			)}
		</BasicButton>
	)
}

export default IconButton
