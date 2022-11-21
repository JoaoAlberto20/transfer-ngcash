import { ArrowCircleDown, ArrowCircleUp } from 'phosphor-react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { TransactionsContext } from '../../context/TransactionsContext'
import { priceFormatter } from '../../helpers/formatter'
import { ContainerCarrousel, SummaryCard, SummaryContainer } from './styles'

export function Summary() {
  const { balance, totalGains, totalExpenses } = useContext(TransactionsContext)
  const { user } = useContext(AuthContext)

  return (
    <ContainerCarrousel>
      <SummaryContainer>
        <SummaryCard>
          <header>
            <p>Olá, @{user?.username} esse é o seu saldo</p>
          </header>
          <strong>{priceFormatter.format(Number(balance.balance))}</strong>
        </SummaryCard>
        <SummaryCard variant="green">
          <header>
            <span>Entradas</span>
            <ArrowCircleUp size={32} color="#00b37e" />
          </header>
          <strong>{priceFormatter.format(totalGains)}</strong>
        </SummaryCard>
        <SummaryCard variant="red">
          <header>
            <span>Saídas</span>
            <ArrowCircleDown size={32} color="#f75a68" />
          </header>
          <strong>{priceFormatter.format(totalExpenses)}</strong>
        </SummaryCard>
      </SummaryContainer>
    </ContainerCarrousel>
  )
}
