import { Router } from 'express';
import { body } from 'express-validator';

import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';

import multerConfigAppointments from '@config/multerConfigAppointments';
import multer from 'multer';
import AppointmentsController from '../controller/AppointmentsController';

const appointmentsRoutes = Router();

const appointmentsController = new AppointmentsController();

appointmentsRoutes.get('/getCards/:id', ensureAuthenticated, appointmentsController.getCards);
appointmentsRoutes.get('/getTable/:id', ensureAuthenticated, appointmentsController.getTable);
appointmentsRoutes.get('/getSexData/:id', ensureAuthenticated, appointmentsController.getSexData);
appointmentsRoutes.get('/getSpecialityData/:id', ensureAuthenticated, appointmentsController.getSpecialityData);
appointmentsRoutes.post('/create',
  body('patientId').not().isEmpty().withMessage('Patient ID is missing'),
  body('doctorId').not().isEmpty().withMessage('Doctor ID is missing'),
  body('companyId').not().isEmpty().withMessage('Company ID is missing'),
  body('doctorSpeciality').not().isEmpty().withMessage('Doctor Speciality is missing'),
  body('transport').not().isEmpty().withMessage('Transport is missing'),
  body('fuel').not().isEmpty().withMessage('Fuel is missing'),
  body('patientCep').not().isEmpty().withMessage('Patient CEP is missing'),
  body('establishmentCode').not().isEmpty().withMessage('Establishment code is missing'),
  body('establishmentCode').isNumeric().withMessage('Establishment code is not valid'),
  body('reason').not().isEmpty().withMessage('Reason is missing'),
  body('type').not().isEmpty().withMessage('Type is missing'),
  body('patientSex').not().isEmpty().withMessage('Patient Sex is missing'),
  body('patientSex').custom(
    (value) => (!(value !== 'Male' && value !== 'Female')),
  ).withMessage('Patient Sex is invalid'),
  appointmentsController.createAppointment);
appointmentsRoutes.get('/getCarbonPerTimeData/:year', ensureAuthenticated, appointmentsController.getCarbonPerTimeData);
appointmentsRoutes.post('/uploadAppointments', multer(multerConfigAppointments).single('file'), appointmentsController.uploadAppointmentsTable);
export default appointmentsRoutes;
