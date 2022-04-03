import { Request, Response, Router } from 'express';
import UrlAddressController from './controllers/UrlAddressController';

const routes: Router = Router();

// routes Health
routes.get('/health', (_: Request, res: Response): Response<unknown> => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date(),
  };

  return res.status(200).json({ data });
});

// routes User
routes.post('/encode', UrlAddressController.encode);

export default routes;
