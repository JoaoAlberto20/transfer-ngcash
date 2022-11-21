import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const LinkContainer = styled(NavLink)`
  font-size: 1.375rem;
  font-weight: 700;
  transition: opacity 0.2s ease 0s;

  color: ${({ theme }) => theme.WHITE};

  &:hover {
    opacity: 0.5;
  }
`
