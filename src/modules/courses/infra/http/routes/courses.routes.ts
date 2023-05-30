import { Router } from 'express';
import multer from 'multer';
import UploadFunction from '@config/upload';
import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';
import CourseController from '../controller/CoursesController';

const upload = multer(UploadFunction('user'));

const courseRoutes = Router();

const courseController = new CourseController();

courseRoutes.post('/create', ensureAuthenticated, courseController.create);
courseRoutes.get('/listPopular', courseController.listPopular);
courseRoutes.get('/listById/:id', courseController.listById);
courseRoutes.get('/getById/:id', courseController.GetById);
courseRoutes.get('/searchCourses/:data', courseController.searchCourses);
courseRoutes.post('/upload/:id', upload.single('photo'), courseController.upload);

export default courseRoutes;
