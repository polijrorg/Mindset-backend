import { Router } from 'express';

import CourseController from '../controller/CoursesController';

const courseRoutes = Router();

const courseController = new CourseController();

courseRoutes.post('/create', courseController.create);
courseRoutes.get('/listPopular', courseController.listPopular);

export default courseRoutes;
