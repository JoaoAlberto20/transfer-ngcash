import { createContext, ReactNode, useCallback, useState } from 'react'

import {
  createTransactionsService,
  getAllTransactionsService,
  getTokenByQueryDateTypeService,
} from '../services/TransactionsService'
import { getBalance } from '../services/BalanceService'

import {
  IPayloadSearTransactionsByDateType,
  IPayloadTransactions,
  ITransactions,
} from '../interfaces/ITransactions'
import { IBalance } from '../interfaces/IBalance'

interface TransactionsContextTypes {
  transactions: ITransactions[]
  balance: IBalance
  totalGains: number
  loading: boolean
  totalExpenses: number
  createTransactions: (data: IPayloadTransactions) => Promise<void>
  getAllTransactionsBalance: () => Promise<void>
  searchTransactionByDateType: (
    data: IPayloadSearTransactionsByDateType,
  ) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextTypes)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransactions[]>([])
  const [balance, setBalance] = useState<IBalance>({} as IBalance)
  const [loading, setLoading] = useState(true)

  const createTransactions = useCallback(
    async ({ username, value }: IPayloadTransactions) => {
      const transaction = await createTransactionsService({ username, value })
      setTransactions((prevState) => [transaction, ...prevState])
    },
    [],
  )

  const getAllTransactionsBalance = useCallback(async () => {
    const transactions = await getAllTransactionsService()
    const balance = await getBalance()
    setTransactions(transactions)
    setBalance(balance)
    setLoading(false)
  }, [])

  const searchTransactionByDateType = useCallback(
    async ({ type, date }: IPayloadSearTransactionsByDateType) => {
      const transactionsFiltered = await getTokenByQueryDateTypeService({
        type,
        date,
      })
      setTransactions(transactionsFiltered)
    },
    [],
  )

  const totalGains = transactions.reduce(
    (prevState, transaction) =>
      transaction.type === 'cash-in'
        ? prevState + Number(transaction.value)
        : prevState,
    0,
  )

  const totalExpenses = transactions.reduce(
    (prevState, transaction) =>
      transaction.type === 'cash-out'
        ? prevState + Number(transaction.value)
        : prevState,
    0,
  )

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        getAllTransactionsBalance,
        createTransactions,
        searchTransactionByDateType,
        balance,
        totalGains,
        totalExpenses,
        loading,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
