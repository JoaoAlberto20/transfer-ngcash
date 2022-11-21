import { TransactionService } from '@services/TransactionService';
import { Request, Response } from 'express';

export class TransactionsController {
  constructor(private service: TransactionService) {}

  public createTransactions = async (req: Request, res: Response ): Promise<Response> => {
    const { username: usernameCashOut } = req.user;
    const {username, value } = req.body;
    
    const transaction = await this.service
      .createTransactions({username, value}, usernameCashOut);

    return res.status(201).json(transaction);
  };

  public getAllTransactions = async (req: Request, res: Response ): Promise<Response> => {
    const { accountId } = req.user;
    const transactions = await this.service.getAllTransactions(accountId);
    return res.status(200).json(transactions);
  };

  public filterTransaction = async (req: Request, res: Response ): Promise<Response> => {
    const {accountId} = req.user;
    const { type, date } = req.query;

    console.log(date);

    if(type === 'cash-out') {
      const transactions = await this.service.getTransactionsByDebitedDate(accountId, date as unknown as Date);
      return res.status(200).json(transactions);
    }
    if(type === 'cash-in') {
      const transactions = await this.service.getTransactionsByCreditedDate(accountId, date as unknown as Date);
      return res.status(200).json(transactions);
    }
    const transactions = await this.service.getAllTransactions(accountId, date as unknown as Date);
    return res.status(200).json(transactions);
  };
}