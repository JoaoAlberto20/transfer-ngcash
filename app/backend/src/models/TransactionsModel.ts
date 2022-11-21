import { prismaClient } from '@database/prismaClient';
import { PrismaClient, Transactions } from '@prisma/client';
import { ICreateTransactions } from '@shared/interfaces/ITransactions';
import { ITransactions } from '@shared/interfaces/ITransactions';

export class TransactionsModel {

  private modelTransaction: PrismaClient;

  constructor() {
    this.modelTransaction = prismaClient;
  }

  public async create({ value, creditedAccountId, debitedAccountId }: ICreateTransactions): Promise<ITransactions> {
    const transaction = await this.modelTransaction.transactions.create({
      data: {
        value,
        debitedAccountId,
        creditedAccountId,
      },
      select: {
        id: true,
        value: true,
        createdAt: true,
        creditedAccountId: true,
        debitedAccountId: true,
        creditedAccount: {
          select: {
            User: {
              select: {
                username: true
              }
            }
          }
        }
      }
    });
    return {
      id: transaction.id,
      debitedAccountId: transaction.debitedAccountId,
      creditedAccountId: transaction.creditedAccountId,
      username: transaction.creditedAccount.User?.username,
      type: 'cash-out',
      value: transaction.value,
      createdAt: transaction.createdAt,
    };
  }

  public async findAll(id: string, date = new Date()): Promise<ITransactions[]> {
    console.log(date);
    const transactions = await this.modelTransaction.transactions.findMany({
      where: {
        OR: [
          {
            debitedAccountId: id,
          },
          {
            creditedAccountId: id,
          },
          {
            createdAt: new Date(date),
          }
        ],
      },
      orderBy: [{ createdAt: 'desc' }],
      select: {
        id: true,
        value: true,
        createdAt: true,
        creditedAccountId: true,
        debitedAccountId: true,
        debitAccount: {
          select: {
            User: {
              select: {
                username: true
              }

            }
          }
        },
        creditedAccount: {
          select: {
            User: {
              select: {
                username: true
              }
            }
          }
        }
      }
    });
    return transactions.map((transaction) => {
      if (transaction.creditedAccountId === id) {
        return {
          id: transaction.id,
          debitedAccountId: transaction.debitedAccountId,
          creditedAccountId: transaction.creditedAccountId,
          username: transaction.creditedAccount.User?.username,
          type: 'cash-in',
          value: transaction.value,
          createdAt: transaction.createdAt
        };
      }
      return {
        id: transaction.id,
        debitedAccountId: transaction.debitedAccountId,
        creditedAccountId: transaction.creditedAccountId,
        username: transaction.creditedAccount.User?.username,
        type: 'cash-out',
        value: transaction.value,
        createdAt: transaction.createdAt,
      };
    });
  }

  public async getByTransactionsByDebitDate(debitedAccountId: string, date = new Date()): Promise<ITransactions[]> {
    const transactions = await this.modelTransaction.transactions.findMany({
      where: {
        OR: [
          {
            debitedAccountId,
          },
          {
            createdAt: new Date(date)
          }
        ]
      },
      orderBy: [{ createdAt: 'desc' }],
      select: {
        id: true,
        value: true,
        createdAt: true,
        creditedAccountId: true,
        debitedAccountId: true,
        creditedAccount: {
          select: {
            User: {
              select: {
                username: true
              }
            }
          }
        }
      }
    });
    return transactions.map((transaction) => ({
      id: transaction.id,
      debitedAccountId: transaction.debitedAccountId,
      creditedAccountId: transaction.creditedAccountId,
      username: transaction.creditedAccount.User?.username,
      type: 'cash-out',
      value: transaction.value,
      createdAt: transaction.createdAt,
    }));
  }

  public async getByTransactionsByCreditedDate(creditedAccountId: string, date = new Date()): Promise<ITransactions[]> {
    const transactions = await this.modelTransaction.transactions.findMany({
      where: {
        OR: [
          {
            creditedAccountId,
          },
          {
            createdAt: new Date(date)
          }
        ]
      },
      orderBy: [{ createdAt: 'desc' }],
      select: {
        id: true,
        creditedAccountId: true,
        debitedAccountId: true,
        value: true,
        createdAt: true,
        creditedAccount: {
          select: {
            User: {
              select: {
                username: true
              }
            }
          }
        }
      }
    });
    return transactions.map((transaction) => {
      return {
        id: transaction.id,
        debitedAccountId: transaction.debitedAccountId,
        creditedAccountId: transaction.creditedAccountId,
        username: transaction.creditedAccount.User?.username,
        type: 'cash-in',
        value: transaction.value,
        createdAt: transaction.createdAt,
      };
    });
  }
} 