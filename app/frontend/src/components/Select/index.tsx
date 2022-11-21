import { ReactNode, SelectHTMLAttributes } from 'react'
import { Container } from './styles'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode
}

export function Select({ children, ...rest }: SelectProps) {
  return <Container {...rest}>{children}</Container>
}
