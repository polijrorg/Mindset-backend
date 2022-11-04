import { Router } from 'express';

import AppointmentsController from '../controller/AppointmentsController';

const appointmentsRoutes = Router();

const appointmentsController = new AppointmentsController();

appointmentsRoutes.get('/getCards/{:id}', appointmentsController.getCards);
appointmentsRoutes.get('/getTable/{:id}', appointmentsController.getTable);
appointmentsRoutes.get('/getGenreData/{:id}', appointmentsController.getTable);

export default appointmentsRoutes;
