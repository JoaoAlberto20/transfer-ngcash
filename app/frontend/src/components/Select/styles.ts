import styled from 'styled-components'

export const Container = styled.select`
  border-radius: 5px;
  height: 54px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  background: ${({ theme }) => theme.GRAY_900};
  color: ${({ theme }) => theme.WHITE};
  text-transform: capitalize;
  border: 0;
`
