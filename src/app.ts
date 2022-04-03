import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import { pathSwagger, serve, setupSwagger } from './helpers/swagger-config';
import { morganConfig } from './config/logger';

const app: express.Express = express();
app.use(express.json());
app.use(cors());
app.use(morgan(morganConfig.format || 'dev', morganConfig.options));
app.use(pathSwagger, serve, setupSwagger);
app.use(routes);

export default app;
