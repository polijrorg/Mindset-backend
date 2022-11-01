import { Router } from 'express';
import { body } from 'express-validator';

import validatorErrorHandler from '@shared/infra/http/middleware/validatorErrorHandler';

import UsersController from '../controller/UsersController';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/register', body('email').isEmail().withMessage('Invalid Email'), validatorErrorHandler, usersController.create);

export default usersRoutes;
