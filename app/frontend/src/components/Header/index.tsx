import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

import { HeaderContainer, HeaderContent, ButtonContent } from './styles'
import { Logo } from '../Logo'
import { Button } from '../Button'

import { SignOut } from 'phosphor-react'
import { toast } from 'react-toastify'

export function Header() {
  const { logout } = useContext(AuthContext)

  const handleSignOut = () => {
    logout()
    toast.success('Deslogado com sucesso')
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo />
        <ButtonContent>
          <Button
            type="button"
            title="Logout"
            variant="SECONDARY"
            onClick={handleSignOut}
            icon={<SignOut size={24} />}
          />
        </ButtonContent>
      </HeaderContent>
    </HeaderContainer>
  )
}
