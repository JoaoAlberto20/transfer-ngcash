import styled from 'styled-components'
import { Form } from '../../../../components/Form'

export const FormFormSignInContainer = styled(Form)`
  background: ${({ theme }) => theme.GRAY_600};
  max-width: 400px;
  width: 100%;
  border-radius: 8px;
  padding: 24px 50px 62px 49px;
`

export const ContentInput = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
