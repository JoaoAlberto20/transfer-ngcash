import { UserController } from '@controller/UserController';
import { UserService } from '@services/UserService';
import { ensureAuthenticated } from '@shared/middleware/ensureAuthenticated';
import { Router } from 'express';


const userController = new UserController(new UserService());

const userRoutes = Router();

userRoutes.post('/', userController.createUser);
userRoutes.get(
  '/validate',
  ensureAuthenticated, 
  userController.validateUser
);

export { userRoutes };