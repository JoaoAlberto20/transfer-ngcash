import { UserController } from '@controller/UserController';
import { UserService } from '@services/UserService';
import { Router } from 'express';


const userController = new UserController(new UserService());

const authenticateRoutes = Router();

authenticateRoutes.post('/', userController.authenticateUser);

export { authenticateRoutes };