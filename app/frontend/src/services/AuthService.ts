import { IPayloadUser, IUser, IUserToken } from '../interfaces/IUser'
import { api } from './api'

export const setTokenGlobal = async (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const authenticateUser = async ({
  username,
  password,
}: IPayloadUser) => {
  const { data } = await api.post<IUserToken>('/login', { username, password })
  setTokenGlobal(data.token)
  return data
}

export const createUser = async ({ username, password }: IPayloadUser) => {
  const { data } = await api.post<IUserToken>('/users', { username, password })
  setTokenGlobal(data.token)
  return data
}

export const validateTokenUser = async (token: string) => {
  const { data } = await api.get<IUser>('/users/validate', {
    headers: { Authorization: `Bearer ${token}` },
  })
  setTokenGlobal(token)
  return data
}
