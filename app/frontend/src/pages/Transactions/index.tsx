import { useContext, useEffect, useState } from 'react'
import { TransactionsContext } from '../../context/TransactionsContext'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { CardTransactions } from '../../components/CardTransactions'

import { ModalFilterTransactions } from './components/ModalFilter'
import { ModalTransactionCreate } from './components/ModalTransactionCreate'

import {
  CardContainer,
  ContainerButton,
  ListEmpty,
  TransactionsContainer,
} from './styles'
import { CurrencyCircleDollar, Faders } from 'phosphor-react'

export function Transactions() {
  const { transactions, getAllTransactionsBalance } =
    useContext(TransactionsContext)
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false)
  const [isModalFilterVisible, setIsModalFilterVisible] = useState(false)

  useEffect(() => {
    const getTransactionsBalance = async () => {
      await getAllTransactionsBalance()
    }
    getTransactionsBalance()
  }, [getAllTransactionsBalance])

  const handleOpenModal = (type: 'create' | 'filter') => {
    if (type === 'create') setIsModalCreateVisible(true)
    if (type === 'filter') setIsModalFilterVisible(true)
  }

  const handleCloseModal = () => {
    setIsModalCreateVisible(false)
    setIsModalFilterVisible(false)
  }

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <ContainerButton>
          <Button
            type="button"
            icon={<CurrencyCircleDollar />}
            title="Transferir"
            variant="SECONDARY"
            onClick={() => handleOpenModal('create')}
          />
          <Button
            type="button"
            icon={<Faders weight="bold" />}
            title="Filtrar"
            variant="SECONDARY"
            onClick={() => handleOpenModal('filter')}
          />
        </ContainerButton>
        <CardContainer>
          {transactions!.length > 0 &&
            transactions?.map((transaction) => (
              <CardTransactions
                key={transaction.id}
                id={transaction.id}
                createdAt={transaction.createdAt}
                type={transaction.type}
                username={transaction.username}
                value={Number(transaction.value)}
              />
            ))}

          {transactions!.length === 0 && (
            <ListEmpty>
              <span>Você ainda não tem nenhuma transação realizada</span>
            </ListEmpty>
          )}
        </CardContainer>
      </TransactionsContainer>
      <ModalTransactionCreate
        visible={isModalCreateVisible}
        handleCloseModal={handleCloseModal}
      />
      <ModalFilterTransactions
        visible={isModalFilterVisible}
        handleCloseModal={handleCloseModal}
      />
    </div>
  )
}
