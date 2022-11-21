import { X } from 'phosphor-react'
import { ReactNode } from 'react'

import { ModalContainer, Overlay } from './styles'

interface ModalProps {
  visible: boolean
  handleCloseModal: () => void
  children: ReactNode
}

export function Modal({ visible, handleCloseModal, children }: ModalProps) {
  if (!visible) return null

  return (
    <Overlay>
      <ModalContainer>
        <button type="button" onClick={handleCloseModal}>
          <X size={24} weight="bold" />
        </button>
        {children}
      </ModalContainer>
    </Overlay>
  )
}
