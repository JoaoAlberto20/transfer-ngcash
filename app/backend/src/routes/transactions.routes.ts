import { TransactionsController } from '@controller/TransactionsController';
import { TransactionService } from '@services/TransactionService';
import { ensureAuthenticated } from '@shared/middleware/ensureAuthenticated';
import { Router } from 'express';


const transactionsController = new TransactionsController(new TransactionService());

const transactionRoutes = Router();


transactionRoutes.use(ensureAuthenticated);
transactionRoutes.post('/', transactionsController.createTransactions);
transactionRoutes.get('/',  transactionsController.getAllTransactions );
transactionRoutes.get('/filter',  transactionsController.filterTransaction );

export { transactionRoutes };