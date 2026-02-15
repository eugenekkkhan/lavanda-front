import BasicButton, {
	BasicButtonProps,
} from '../../atoms/BasicButton/BasicButton'

interface TextButtonProps extends Omit<BasicButtonProps, 'children'> {
	text: string
}

const TextButton = ({ text, ...props }: TextButtonProps) => {
	return <BasicButton {...props}>{text}</BasicButton>
}

export default TextButton
