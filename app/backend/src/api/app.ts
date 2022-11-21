import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'; 

import { errorHandler } from '@shared/middleware/erroTreatment';
import { routes } from '@routes/index';

import swaggerFile from './swagger.json';

export class App {
  private app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    this.app.use(cors());
    this.app.get('/', (_req, res) => res.json({ ok: true }));
    this.app.use(routes);
    this.app.use(errorHandler);
  }
  
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on localhost http://localhost:${PORT}`));
  }
}