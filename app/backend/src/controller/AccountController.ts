import { AccountService } from '@services/AccountService';
import { Request, Response } from 'express';

export class AccountController {
  constructor(private service: AccountService) {}

  public getBalance = async (req: Request, res: Response ): Promise<Response> => {
    const { accountId } = req.user;
    const balance = await this.service.getBalance(accountId);
    return res.status(201).json(balance);
  };
}