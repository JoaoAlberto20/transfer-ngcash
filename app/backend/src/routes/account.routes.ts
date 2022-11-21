import { Router } from 'express';
import { AccountController } from '@controller/AccountController';
import { AccountService } from '@services/AccountService';
import { ensureAuthenticated } from '@shared/middleware/ensureAuthenticated';
import { App } from 'api/app';


const accountController = new AccountController(new AccountService());

const accountRoutes = Router();

accountRoutes.use( ensureAuthenticated);
accountRoutes.get('/', accountController.getBalance);

export { accountRoutes };