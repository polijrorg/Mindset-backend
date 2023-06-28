import { Router } from 'express';
import multer from 'multer';
import UploadFunction from '@config/upload';

// import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';

import ProducersController from '../controller/ProducersController';

const producersRoutes = Router();

const upload = multer(UploadFunction('producer'));
const producersController = new ProducersController();

producersRoutes.post('/apply', upload.any(), producersController.create);
// producersRoutes.delete('/delete/:id', producersController.deleteUser);

export default producersRoutes;
