import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';

import CourseController from '../controller/CoursesController';

const courseRoutes = Router();

const courseController = new CourseController();

courseRoutes.post('/create', ensureAuthenticated, courseController.create);
courseRoutes.get('/listPopular', courseController.listPopular);
courseRoutes.get('/listById/:id', courseController.listById);
export default courseRoutes;
