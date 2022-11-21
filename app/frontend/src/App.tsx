import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import { defaultTheme } from './styles/themes'
import { GlobalStyles } from './styles/GlobalStyles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { AuthProvider } from './context/AuthContext'

import { Router } from './routes'
import { TransactionsProvider } from './context/TransactionsContext'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <AuthProvider>
          <TransactionsProvider>
            <Router />
            <ToastContainer />
          </TransactionsProvider>
        </AuthProvider>
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  )
}

export default App
