import { Request, Response, Router } from 'express';
// import UserController from './controllers/UserController';

const routes: Router = Router();

// routes Hello
routes.get('/health', (_: Request, res: Response): Response<unknown> => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date(),
  };

  return res.status(200).json({ data });
});

// routes User
// routes.get('/admin', UserController.index);

export default routes;
