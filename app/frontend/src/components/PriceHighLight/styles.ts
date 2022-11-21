import styled from 'styled-components'

interface PriceHighLightProps {
  variant: 'cash-in' | 'cash-out'
}

export const PriceHighLightContainer = styled.strong<PriceHighLightProps>`
  color: ${({ theme, variant }) =>
    variant === 'cash-in' ? theme.GREEN_300 : theme.RED_300};
`
