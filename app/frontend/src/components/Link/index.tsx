import { ReactNode } from 'react'
import { NavLinkProps } from 'react-router-dom'
import { LinkContainer } from './styles'

type LinkProps = NavLinkProps & {
  children: ReactNode
}

export function Link({ children, ...rest }: LinkProps) {
  return <LinkContainer {...rest}>{children}</LinkContainer>
}
