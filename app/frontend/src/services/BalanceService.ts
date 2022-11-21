import { api } from './api'
import { IBalance } from '../interfaces/IBalance'

export const getBalance = async () => {
  const { data } = await api.get<IBalance>('/balance')
  return data
}
