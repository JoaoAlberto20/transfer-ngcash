import styled from 'styled-components'

export const Overlay = styled.div`
  left: 0px;
  top: 0px;
  background: ${({ theme }) => theme.OVERLAY};
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  @media (max-width: 550px) {
    align-items: flex-end;
  }
`

export const ModalContainer = styled.div`
  width: 535px;

  background: ${({ theme }) => theme.GRAY_800};
  box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.8);

  padding: 3rem;
  border-radius: 6px;
  position: relative;

  > button {
    line-height: 0;
    position: absolute;
    right: 2rem;
    top: 1.5rem;
    background: transparent;
    cursor: pointer;
    color: ${({ theme }) => theme.GRAY_400};
    &:hover {
      color: ${({ theme }) => theme.RED_300};
    }
  }

  strong {
    display: block;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.GRAY_100};
  }

  @media (max-width: 550px) {
    border-radius: 20px 20px 0px 0px;
  }
`
