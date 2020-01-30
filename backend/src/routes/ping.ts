import { Router } from 'express';
import PingController from '../controllers/ping';

const pingRouter : Router = Router();
pingRouter.get('/hello', PingController.ping);

export default pingRouter;
