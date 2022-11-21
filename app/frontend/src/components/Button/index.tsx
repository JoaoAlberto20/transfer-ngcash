import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ButtonContainer } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
  variant: 'PRIMARY' | 'SECONDARY' | 'TERTIARY'
  title?: string
}

export function Button({ title, icon, variant, ...rest }: ButtonProps) {
  return (
    <ButtonContainer variant={variant} {...rest} title={title}>
      {icon && icon}
      <p>{title}</p>
    </ButtonContainer>
  )
}
