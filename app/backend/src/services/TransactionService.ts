import { AccountsModel } from '@models/AccountsModel';
import { TransactionsModel } from '@models/TransactionsModel';
import { UserModel } from '@models/UserModel';
import { AppError } from '@shared/errors/AppError';
import { ICreateTransaction, TransactionsCreateZodSchemas } from '@shared/interfaces/ICreateTransactions';

interface IRequest { 
  username: string
  value: number
}

export class TransactionService {

  constructor(
    private userModel = new UserModel(),
    private accountModel = new AccountsModel(),
    private transactionModel = new TransactionsModel()
  ) {}

  static async zodValidation(obj: ICreateTransaction): Promise<ICreateTransaction> {
    const transactionParsed = await TransactionsCreateZodSchemas.safeParseAsync(obj);
    if (!transactionParsed.success) {
      throw transactionParsed.error;
    }
    return transactionParsed.data;
  }

  private verifyWithUserSameAndBalanceIsEnough = async (
    { username, value}: IRequest, usernameCashOut: string): Promise<string>  => {
    const userCashOut = await this.userModel.findOne(usernameCashOut);

    if( usernameCashOut === username) {
      throw new AppError('Não é possível fazer uma transação para si mesmo');
    }
    const accountCashOut = await this.accountModel.findOne(userCashOut?.accountId as string);

    if (accountCashOut.balance < value || value === 0 ) {
      throw new AppError('Saldo insuficiente para efetuar a transação', 401);
    }

    const balanceChange = Number(accountCashOut.balance) - value;

    await this.accountModel.update(accountCashOut.id, balanceChange);

    return accountCashOut.id;
  };

  private verifyWithUserCashInExist = async (usernameCashIn: string, value: number): Promise<string> => {
    const userCashIn = await this.userModel.findOne(usernameCashIn);
    if(!userCashIn) {
      throw new AppError(
        'Transação não realizadas porque o usuário que você quer fazer a transação não existe', 400
      );
    }
    const accountCashIn = await this.accountModel.findOne(userCashIn.accountId);

    const balanceChange = Number(accountCashIn.balance) + value;

    await this.accountModel.update(accountCashIn.id, balanceChange);

    return accountCashIn.id;
  };

  public createTransactions = async (request: IRequest, usernameCashOut: string) => {
    const { username, value } = await TransactionService.zodValidation(request);

    const debitedAccountId = await this
      .verifyWithUserSameAndBalanceIsEnough({ username, value } , usernameCashOut);

    const creditedAccountId = await this
      .verifyWithUserCashInExist(username, value);

    const transaction = await this.transactionModel
      .create({ value, debitedAccountId, creditedAccountId});

    return transaction;
  };
  
  public getAllTransactions = async (accountId: string, date?: Date) => {
    const transactions = await this.transactionModel.findAll(accountId, date);
    return transactions;
  };

  public getTransactionsByDebitedDate = async (accountId: string, date?: Date) => {
    const transactions = await this.transactionModel.getByTransactionsByDebitDate(accountId, date);
    return transactions;
  };
  
  public getTransactionsByCreditedDate= async (accountId: string, date?: Date) => {
    const transactions = await this.transactionModel.getByTransactionsByCreditedDate(accountId, date);
    return transactions;
  };
}
