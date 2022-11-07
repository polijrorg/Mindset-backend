import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';

import AppointmentsController from '../controller/AppointmentsController';

const appointmentsRoutes = Router();

const appointmentsController = new AppointmentsController();

appointmentsRoutes.get('/getCards/:id', ensureAuthenticated, appointmentsController.getCards);
appointmentsRoutes.get('/getTable/:id', ensureAuthenticated, appointmentsController.getTable);
appointmentsRoutes.get('/getGenreData/:id', ensureAuthenticated, appointmentsController.getGenreData);

export default appointmentsRoutes;
