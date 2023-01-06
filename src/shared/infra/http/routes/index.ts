import { Router } from 'express';

// Users
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import appointmenstRoutes from '@modules/appointment/infra/http/routes/appointments.routes';
import establishmentsRoutes from '@modules/establishment/infra/http/routes/establishment.routes';

const routes = Router();

routes.use('', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/appointments/', appointmenstRoutes);
routes.use('/establishment/', establishmentsRoutes);

export default routes;
