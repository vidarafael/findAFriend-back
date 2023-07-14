import express from 'express';
import { routes } from './infra/routes';

const app = express();
app.use(express.json())

app.use(routes)

export { app };
