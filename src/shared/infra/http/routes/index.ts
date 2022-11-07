import { Router } from 'express';

// Users
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import appointmenstRoutes from '@modules/appointment/infra/http/routes/appointments.routes';

const routes = Router();

// Users
routes.use('', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/appointments/', appointmenstRoutes);

export default routes;
