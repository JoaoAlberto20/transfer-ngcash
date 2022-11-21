import { dateFormatter } from '../../helpers/formatter'
import { PriceHighLight } from '../PriceHighLight'
import {
  CardTransactionsContainer,
  ContainerInfoAndDate,
  ContainerNameType,
} from './styles'

import { TagSimple, CalendarBlank } from 'phosphor-react'

interface CardTransactionsProps {
  id: string
  value: number
  createdAt: Date
  type: 'cash-in' | 'cash-out'
  username: string
}

export function CardTransactions({
  id,
  value,
  createdAt,
  type,
  username,
}: CardTransactionsProps) {
  return (
    <CardTransactionsContainer key={id}>
      <ContainerInfoAndDate>
        <strong>
          {type === 'cash-in' ? 'Transação Recebida' : 'Transação Enviada'}
        </strong>
        <p>
          <CalendarBlank fontSize={24} />
          {dateFormatter.format(new Date(createdAt))}
        </p>
      </ContainerInfoAndDate>
      <PriceHighLight type={type} price={value} />
      <ContainerNameType>
        <p>
          <TagSimple fontSize={24} />@{username}
        </p>
        <p>{type}</p>
      </ContainerNameType>
    </CardTransactionsContainer>
  )
}
