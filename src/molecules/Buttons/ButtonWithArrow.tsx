import BasicButton , {BasicButtonProps}  from '../../atoms/BasicButton/BasicButton'
import { GoArrowLeft } from "react-icons/go";


const ButtonWithArrow = ({children , ...props} : BasicButtonProps) => {
	return (
		<BasicButton {...props} className='inline-flex items-center justify-center gap-2'>
			<GoArrowLeft/>
			{children}
		</BasicButton>
	)
}

export default ButtonWithArrow
