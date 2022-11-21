export interface IPayloadTransactions {
  username: string
  value: string
}

export interface IPayloadSearTransactionsByDateType {
  date?: string
  type?: string
}

export interface ITransactions {
  id: string
  value: number
  username: string
  type: 'cash-out' | 'cash-in'
  creditedAccountId: string
  debitedAccountId: string
  createdAt: Date
}
