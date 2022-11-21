import {
  ReactNode,
  useCallback,
  useEffect,
  useState,
  createContext,
} from 'react'

import { toast } from 'react-toastify'

import {
  authenticateUser,
  createUser,
  validateTokenUser,
} from '../services/AuthService'
import { IPayloadUser, IUser } from '../interfaces/IUser'
import { useNavigate } from 'react-router-dom'

interface AuthContextTypes {
  user: IUser | null
  isAuthenticateUser: boolean
  loading: boolean
  create: (data: IPayloadUser) => Promise<void>
  login: (data: IPayloadUser) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextTypes>(
  {} as AuthContextTypes,
)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const TOKEN_STORAGE = '@app-ngCash:token'
  const navigate = useNavigate()

  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem(TOKEN_STORAGE)
      try {
        if (token) {
          const userData = await validateTokenUser(token)
          setUser(userData)
          navigate('home')
        } else {
          setUser(null)
        }
      } catch (error) {
        if (error instanceof Error) {
          setUser(null)
          toast.warn(error.message)
        }
      } finally {
        setLoading(false)
      }
    }
    getUser()
  }, [navigate])

  const create = useCallback(async ({ username, password }: IPayloadUser) => {
    const userData = await createUser({ username, password })
    localStorage.setItem(TOKEN_STORAGE, userData!.token)
    setUser(userData!.user)
  }, [])

  const login = useCallback(async ({ username, password }: IPayloadUser) => {
    const userData = await authenticateUser({ username, password })
    localStorage.setItem(TOKEN_STORAGE, userData!.token)
    setUser(userData!.user)
  }, [])

  const logout = useCallback(async () => {
    localStorage.removeItem(TOKEN_STORAGE)
    setUser(null)
  }, [])

  const isAuthenticateUser = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        create,
        login,
        logout,
        isAuthenticateUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
