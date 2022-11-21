import { AccountsModel } from '@models/AccountsModel';

export class AccountService {

  constructor(
    private accountModel = new AccountsModel()
  ) {}
  
  public getBalance = async (accountId: string) => {
    const balance = await this.accountModel.findOne(accountId);
    return balance;
  };
 
}