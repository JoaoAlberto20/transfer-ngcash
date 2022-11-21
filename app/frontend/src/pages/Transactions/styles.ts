import styled from 'styled-components'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
`

export const ContainerButton = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    max-width: 152px;
  }
`

export const ListEmpty = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`
