import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.GRAY_900};
  padding: 2.5rem 0 7.5rem;
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;

  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ButtonContent = styled.div`
  display: flex;

  @media (max-width: 760px) {
    button {
      display: flex;
      align-items: center;
      max-width: 130px;

      p {
        font-size: 12px;
      }
    }
  }
`
