import { Router } from 'express';

import AppointmentsController from '../controller/AppointmentsController';

const appointmentsRoutes = Router();

const appointmentsController = new AppointmentsController();

appointmentsRoutes.post('/getCards/{:id}', appointmentsController.getCards);

export default appointmentsRoutes;
