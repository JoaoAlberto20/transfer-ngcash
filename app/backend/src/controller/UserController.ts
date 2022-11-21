import { UserService } from '@services/UserService';
import { Request, Response } from 'express';

export class UserController {
  constructor(private service: UserService) {}

  public createUser = async (req: Request, res: Response ): Promise<Response> => {
    const { username, password  } = req.body;
    const user = await this.service.createUser({username, password,});
    return res.status(201).json(user);
  };

  public authenticateUser = async (req: Request, res: Response ): Promise<Response> => {
    const { username, password } = req.body;
    const user = await this.service.authenticateUser({username, password});
    return res.status(201).json(user);
  };

  public validateUser = async (req: Request, res: Response ): Promise<Response> => {
    const { username } = req.user;
    const user = await this.service.validateUser(username);
    return res.status(201).json(user);
  };
}