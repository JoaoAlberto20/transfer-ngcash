import {
  IPayloadSearTransactionsByDateType,
  IPayloadTransactions,
  ITransactions,
} from '../interfaces/ITransactions'
import { api } from './api'

export const createTransactionsService = async ({
  username,
  value,
}: IPayloadTransactions) => {
  const { data } = await api.post<ITransactions>('/transactions', {
    username,
    value: Number(value),
  })
  return data
}

export const getAllTransactionsService = async () => {
  const { data } = await api.get<ITransactions[]>('/transactions')
  return data
}

export const getTokenByQueryDateTypeService = async ({
  type,
  date,
}: IPayloadSearTransactionsByDateType) => {
  const { data } = await api.get<ITransactions[]>(
    `/transactions/filter?type=${type}&date=${
      date === '' ? new Date().toISOString() : date
    }`,
  )
  return data
}
