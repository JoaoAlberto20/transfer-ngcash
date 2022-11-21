import styled from 'styled-components'

export const TitleContainer = styled.h1`
  color: ${({ theme }) => theme.WHITE};

  &:after {
    content: '';
    display: block;
    width: 55px;
    border-bottom: 10px solid ${({ theme }) => theme.RED_500};
  }
`
