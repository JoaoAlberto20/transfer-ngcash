import logoSvg from '../../assets/logo.svg'
import { LogoContainer } from './styles'

export function Logo() {
  return (
    <LogoContainer>
      <img src={logoSvg} alt="" />
      <span>Minha Carteira</span>
    </LogoContainer>
  )
}
