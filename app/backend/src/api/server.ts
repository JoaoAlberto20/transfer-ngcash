import { App } from './app';
import 'dotenv/config';

const app = new App();

const PORT = process.env.API_PORT as unknown as number;

console.log(process.env.API_PORT);

app.start(PORT);