import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { verifyToken } from '../config/token';
import { UserModel } from '@models/UserModel';


interface IPayload {
  username: string;
}

export async function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('Token invalido', 401);

  const [, token] = authHeader.split(' ');

  try {
    const { username } = verifyToken(token) as IPayload;
    

    const usersRepository = new UserModel();

    const user = await usersRepository.findOne(username);

    if (!user) throw new AppError('User does not exist!', 400);

    request.user = {
      id: user.id,
      username: user.username,
      accountId: user.accountId
    };

    next();
  } catch (err) {
    throw new AppError('Token invalido', 401);
  }
}
