import { PrismaClient } from '@prisma/client';
import { prismaClient } from '@database/prismaClient';
import { ICreateUser } from '@shared/interfaces/ICreateUser';
import { IUser } from '@shared/interfaces/IUser';


export class UserModel {
  private modelUser: PrismaClient;

  constructor() {
    this.modelUser = prismaClient;
  }
 
  public create = async(data: ICreateUser, accountId: string): Promise<IUser> => {
    const {password, username } = data;

    const user = await this.modelUser.user.create({
      data: { username,  password,  accountId }
    });
    return user;
  };

  public findOne = async (username: string): Promise<IUser | null> => {
    const user = await this.modelUser.user.findUnique({ 
      where:{
        username
      },
    });
    return user;
  };

  public findById = async (username: string) => {
    const user = await this.modelUser.user.findUnique({ 
      where:{
        username
      },
      select: {
        id: true,
        username: true,
        accountId: true
      }
    });
    return user;
  }; 
} 