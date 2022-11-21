import { Router } from 'express';
import { userRoutes } from './user.routes';
import { authenticateRoutes } from './authenticate.routes';
import { accountRoutes } from './account.routes';
import { transactionRoutes } from './transactions.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/login', authenticateRoutes);
routes.use('/balance', accountRoutes);
routes.use('/transactions', transactionRoutes);

export {routes};