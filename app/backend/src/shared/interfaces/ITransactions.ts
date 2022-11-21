

export interface ITransactions {
  id: string;
  value: number;
  username?: string
  type: string
  creditedAccountId?: string;
  debitedAccountId?: string;
  createdAt: Date;
}


export interface ICreateTransactions {
  debitedAccountId: string,
  creditedAccountId: string,
  value: number
}

