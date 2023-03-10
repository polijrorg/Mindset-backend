import { Router } from 'express';

// Users
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import coursesRoutes from '@modules/courses/infra/http/routes/courses.routes';

const routes = Router();

routes.use('', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/courses', coursesRoutes);

export default routes;
