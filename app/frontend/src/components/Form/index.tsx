import { FormHTMLAttributes, ReactNode } from 'react'
import { FormContainer } from './styles'

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode
}

export function Form({ children, ...rest }: FormProps) {
  return <FormContainer {...rest}>{children}</FormContainer>
}
