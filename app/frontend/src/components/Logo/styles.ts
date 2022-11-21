import styled from 'styled-components'

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8125rem;

  img {
    width: 50px;
    height: 50px;
  }

  span {
    font-size: 1.5rem;
    line-height: 1.75rem;
    font-weight: bold;
  }

  @media (max-width: 600px) {
    span {
      font-size: 1rem;
    }

    img {
      width: 24px;
      height: 24px;
    }
  }
`
