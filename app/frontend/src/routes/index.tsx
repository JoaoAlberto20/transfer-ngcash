import { useContext } from 'react'
import { Loading } from '../components/Loading'
import { AuthContext } from '../context/AuthContext'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Router() {
  const { isAuthenticateUser, loading } = useContext(AuthContext)

  if (loading) {
    return <Loading />
  }

  return isAuthenticateUser ? <AppRoutes /> : <AuthRoutes />
}
