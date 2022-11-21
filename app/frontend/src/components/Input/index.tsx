import { FormEvent, InputHTMLAttributes, ReactNode, useCallback } from 'react'
import { maskCurrency } from '../../helpers/formatter'
import { HelperText, InputContainer, InputField } from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant: 'PRIMARY' | 'SECONDARY'
  icon?: ReactNode
  errorMessage?: string | null
  mask?: 'currency'
}

export function Input({
  mask,
  icon,
  errorMessage = null,
  ...rest
}: InputProps) {
  const handleKeyUp = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      if (mask === 'currency') {
        maskCurrency(event)
      }
    },
    [mask],
  )
  return (
    <InputContainer>
      {icon && icon}
      <InputField {...rest} onKeyUp={handleKeyUp} />
      {errorMessage && <HelperText>{errorMessage}</HelperText>}
    </InputContainer>
  )
}
