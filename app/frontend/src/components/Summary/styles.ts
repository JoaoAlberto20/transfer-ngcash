import styled, { css } from 'styled-components'

export const ContainerCarrousel = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  @media (max-width: 760px) {
    cursor: grab;
    width: 100%;
    padding-left: 1.5rem;
    padding-right: 0px;
  }
`

export const SummaryContainer = styled.div`
  display: flex;
  gap: 2rem;

  overflow-y: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  margin-top: -5rem;

  @media (max-width: 760px) {
    padding: 0 1.5rem;
  }
`

interface SummaryCardProps {
  variant?: 'green' | 'red'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${({ theme }) => theme.GRAY_600};
  border-radius: 6px;
  padding: 1.25rem 2rem;
  flex: 1;

  scroll-snap-align: start;

  @media (max-width: 752px) {
    width: 280px;
    flex: none;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }

  ${({ theme, variant }) =>
    variant === 'green' &&
    css`
      background: ${theme.GREEN_700};
    `}

  ${({ theme, variant }) =>
    variant === 'red' &&
    css`
      background: ${theme.RED_700};
    `}
`
