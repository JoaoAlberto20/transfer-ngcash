import { FormEvent } from 'react'

export const dateFormatter = new Intl.DateTimeFormat('pt-BR')

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const maskCurrency = (event: FormEvent<HTMLInputElement>) => {
  let value = event.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d)(\d{2})$/, '$1.$2')
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.')
  event.currentTarget.value = value
  return event
}
