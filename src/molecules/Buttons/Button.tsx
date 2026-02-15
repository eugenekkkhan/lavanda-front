import BasicButton , {BasicButtonProps}  from '../../atoms/BasicButton/BasicButton'

interface TextButtonProps extends BasicButtonProps {
  text: string
}

const TextButton = ({ text, ...props } : TextButtonProps) => {
	return (
		<BasicButton {...props}>
      {text}
    </BasicButton>
	)
}

export default TextButton
