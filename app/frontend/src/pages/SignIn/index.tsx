import { Logo } from '../../components/Logo'
import { Link } from '../../components/Link'
import { FormSignIn } from './components/FormSignIn'

import { SignInContainer } from './styles'

export function SignIn() {
  console.log(process.env.REACT_APP_URL_API)

  return (
    <SignInContainer>
      <Logo />
      <FormSignIn />
      <Link to="/register">criar minha conta</Link>
    </SignInContainer>
  )
}
