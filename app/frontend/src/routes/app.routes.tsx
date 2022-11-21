import { Navigate, Route, Routes } from 'react-router-dom'
import { Transactions } from '../pages/Transactions'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Transactions />} />
    </Routes>
  )
}
