import { Router } from 'express';
import { body, param } from 'express-validator';

import forgotPasswordAuthentication from '@shared/infra/http/middleware/forgotPasswordAuthentication';

import UsersController from '../controller/UsersController';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/register',
  body('email').isEmail().withMessage('Email missing'),
  body('name').not().isEmpty().withMessage('Name missing'),
  body('password').not().isEmpty().withMessage('Password missing'),
  usersController.create);

usersRoutes.get('/forgotPasswor/:email',
  param('email').not().isEmpty().withMessage('Email missing'),
  usersController.forgotPassword);

usersRoutes.post('/changePassword',
  forgotPasswordAuthentication,
  body('password').not().isEmpty().withMessage('Password missing'),
  usersController.changePassword);
export default usersRoutes;
