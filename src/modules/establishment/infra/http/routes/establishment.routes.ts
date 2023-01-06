import { Router } from 'express';
import multer from 'multer';

import multerConfig from '@config/multerConfig';

import EstablishmentsController from '../controller/EstablishmentsController';

const establishmentsRoutes = Router();

const establishmentsController = new EstablishmentsController();

establishmentsRoutes.post('/uploadCNESTable', multer(multerConfig).single('file'), establishmentsController.upload);

export default establishmentsRoutes;
