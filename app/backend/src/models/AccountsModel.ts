import { PrismaClient } from '@prisma/client';
import { IAccounts } from '@shared/interfaces/IAccounts';
import { prismaClient } from '../database/prismaClient';

export class AccountsModel {
  private modelAccounts: PrismaClient;

  constructor () {
    this.modelAccounts =  prismaClient;
  }
 
  async create(balance = 100): Promise<IAccounts> {
    const account = await this.modelAccounts.accounts.create({
      data: { balance }
    });
    return account;
  }

  async findOne(id: string): Promise<IAccounts> {
    const account = await this.modelAccounts.accounts.findUnique({
      where: { id }
    });
    return account as IAccounts;
  }

  async update(id: string, balance: number): Promise<void> {
    await this.modelAccounts.accounts.update({
      where: { id },
      data: { balance }
    });
  }
} 