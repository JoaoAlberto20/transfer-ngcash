import styled, { css } from 'styled-components'

export type StylesButton = {
  variant: 'PRIMARY' | 'SECONDARY' | 'TERTIARY'
}

export const ButtonContainer = styled.button<StylesButton>`
  height: 50px;
  border: 0;
  color: ${({ theme }) => theme.WHITE};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;

  ${({ variant }) =>
    variant === 'PRIMARY' &&
    css`
      background: ${({ theme }) => theme.GREEN_500};
    `}

  ${({ variant }) =>
    variant === 'SECONDARY' &&
    css`
      background: transparent;
      border: 1px solid ${({ theme }) => theme.GREEN_500};
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      &:hover {
        background: ${({ theme }) => theme.GREEN_500};
        color: ${({ theme }) => theme.WHITE};

        svg {
          color: ${({ theme }) => theme.WHITE};
        }
      }

      @media (max-width: 760px) {
        p {
          display: none;
        }
      }
    `}

  svg {
    width: 20px;
    height: 20px;
    transition: all 0.2s ease 0s;
    color: ${({ theme }) => theme.GREEN_300};
  }

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    cursor: not-allowed;
    filter: brightness(0.5);
  }
`
