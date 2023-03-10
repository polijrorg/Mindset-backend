import { Router } from 'express';

import CourseController from '../controller/videoClassesController';

const courseRoutes = Router();

const courseController = new CourseController();

courseRoutes.post('/create', courseController.create);

export default courseRoutes;
