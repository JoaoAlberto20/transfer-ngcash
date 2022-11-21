import styled from 'styled-components'

export const CardTransactionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.GRAY_700};

  @media (min-width: 560px) {
    svg {
      display: none;
    }
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;

    strong {
      font-weight: 700;
      font-size: 1.25rem;
    }

    p {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: ${({ theme }) => theme.GRAY_500};
    }

    svg {
      height: 1rem;
      width: 1rem;
      color: ${({ theme }) => theme.GRAY_500};
    }
  }
`

export const ContainerInfoAndDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 560px) {
    flex-direction: row;
  }
`

export const ContainerNameType = styled.div`
  display: flex;
  justify-content: space-between;
`
