import { Link } from '../../components/Link'
import { Logo } from '../../components/Logo'
import { SignUpContainer } from './styles'
import { FormSingUp } from './components/FormSingUp'

export function SignUp() {
  return (
    <SignUpContainer>
      <Logo />
      <FormSingUp />
      <Link to="/login">Já tenho uma conta</Link>
    </SignUpContainer>
  )
}
