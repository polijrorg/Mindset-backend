import { Router } from 'express';

// import forgotPasswordAuthentication from '@shared/infra/http/middleware/forgotPasswordAuthentication';
// import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';

import UsersController from '../controller/UsersController';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/register', usersController.create);

export default usersRoutes;
