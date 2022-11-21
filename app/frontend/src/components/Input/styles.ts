import styled, { css } from 'styled-components'

type StylesInput = {
  variant: 'PRIMARY' | 'SECONDARY'
}
export const InputContainer = styled.div`
  width: 100%;
  position: relative;

  > svg {
    position: absolute;
    left: 1rem;
    top: 1.1rem;
    color: ${({ theme }) => theme.GRAY_700};
    font-size: 0.875rem;
    transition: fill 0.2s ease 0s;
  }

  &:focus-within > svg {
    color: ${({ theme }) => theme.GREEN_500};
  }
`

export const InputField = styled.input<StylesInput>`
  width: 100%;
  font-size: 1rem;
  height: 54px;
  padding: 1rem;
  background: ${({ theme }) => theme.GRAY_900};
  border: 1px solid ${({ theme }) => theme.GRAY_900};
  border-color: ${({ theme }) => theme.GRAY_900};
  color: ${({ theme }) => theme.GRAY_300};
  border-radius: 5px;
  text-transform: capitalize;

  ${({ variant }) =>
    variant === 'PRIMARY' &&
    css`
      height: 50px;
      padding: 0px 1em 0px 2.65em;
    `}

  &:disabled {
    cursor: not-allowed;
  }
`

export const HelperText = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.RED_500}; ;
`
