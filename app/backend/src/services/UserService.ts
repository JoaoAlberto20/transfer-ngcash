import { hash, compare } from 'bcrypt';

import { AccountsModel } from '@models/AccountsModel';
import { UserModel } from '@models/UserModel';
import { createToken } from '@shared/config/token';
import { AppError } from '@shared/errors/AppError';
import { ICreateUser, UserCreateZodSchemas } from '@shared/interfaces/ICreateUser';

export class UserService {

  constructor(
    private userModel = new UserModel(),
    private accountModel = new AccountsModel()
  ) {}

  static async zodValidation(obj: ICreateUser): Promise<ICreateUser> {
    const userParsed = await UserCreateZodSchemas.safeParseAsync(obj);
    if (!userParsed.success) {
      console.log(userParsed.error);
      throw userParsed.error;
    }
    return userParsed.data;
  }

  public createUser = async (request: ICreateUser )  => {
    const schemasValid = await UserService.zodValidation(request);

    const userAlreadyExist = await this.userModel.findOne(schemasValid.username);
    if(userAlreadyExist) throw new AppError('User already exists');

    const passwordHash =  await hash(schemasValid.password as string, 8);

    const { id: accountId } = await this.accountModel.create();
    
    const user = await this.userModel.create(
      { username: schemasValid.username, password: passwordHash },
      accountId
    );

    const token = createToken({ 
      username: user.username,  
    });  

    return {
      token,
      user: {
        id: user.id, 
        username: user.username, 
        accountId:  user.accountId
      }
    };
  };

  public authenticateUser = async (request: ICreateUser) => {
    const user = await this.userModel.findOne(request.username);
    if(!user) throw new AppError('Email ou senha incorreto');

    const passwordMatch = await compare(request.password as string, user.password as string);
    if (!passwordMatch) throw new AppError('Email ou senha incorreto.');

    const token = createToken({ 
      username: user.username,  
    });  

    return {
      token,
      user: {
        id: user.id, 
        username:  user.username, 
        accountId:  user.accountId
      }
    };
  };

  public validateUser = async (id: string) => {
    const user = await this.userModel.findById(id);
    return user;
  };
}