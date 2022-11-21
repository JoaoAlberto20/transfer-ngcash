import { Router } from 'express';
import { AccountController } from '@controller/AccountController';
import { AccountService } from '@services/AccountService';
import { ensureAuthenticated } from '@shared/middleware/ensureAuthenticated';


const accountController = new AccountController(new AccountService());

const accountRoutes = Router();

accountRoutes.get(
  '/',
  ensureAuthenticated ,
  accountController.getBalance
);

export { accountRoutes };