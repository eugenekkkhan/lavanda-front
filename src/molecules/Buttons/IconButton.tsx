import BasicButton, { BasicButtonProps } from '../../atoms/BasicButton/BasicButton'
import { IconType } from 'react-icons'  

interface IconButtonProps extends BasicButtonProps {
  icon: IconType
  iconSize?: number | string
  iconClassName?: string
}

const IconButton = ({
  children,
  icon: Icon,
  iconSize = 25,
  iconClassName = '',
  className = '',
  ...props
}: IconButtonProps) => {
  return (
    <BasicButton
      className={`flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      <Icon size={iconSize} className={iconClassName} />
      {children}
    </BasicButton>
  )
}

export default IconButton