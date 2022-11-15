import { Router } from 'express';
import { body } from 'express-validator';

import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';

import AppointmentsController from '../controller/AppointmentsController';

const appointmentsRoutes = Router();

const appointmentsController = new AppointmentsController();

appointmentsRoutes.get('/getCards/:id', ensureAuthenticated, appointmentsController.getCards);
appointmentsRoutes.get('/getTable/:id', ensureAuthenticated, appointmentsController.getTable);
appointmentsRoutes.get('/getGenreData/:id', ensureAuthenticated, appointmentsController.getGenreData);
appointmentsRoutes.get('/getSpecialityData/:id', ensureAuthenticated, appointmentsController.getSpecialityData);
appointmentsRoutes.post('/create',
  body('patientId').not().isEmpty().withMessage('Patient ID is missing'),
  body('doctorId').not().isEmpty().withMessage('Doctor ID is missing'),
  body('companyId').not().isEmpty().withMessage('Company ID is missing'),
  body('doctorSpeciality').not().isEmpty().withMessage('Doctor Speciality is missing'),
  body('transport').not().isEmpty().withMessage('Transport is missing'),
  body('fuel').not().isEmpty().withMessage('Fuel is missing'),
  body('patientCep').not().isEmpty().withMessage('Patient CEP is missing'),
  body('establishment').not().isEmpty().withMessage('Establishment is missing'),
  body('establishmentCep').not().isEmpty().withMessage('Establishment CEP is missing'),
  body('reason').not().isEmpty().withMessage('Reason is missing'),
  body('type').not().isEmpty().withMessage('Type is missing'),
  body('patientGenre').not().isEmpty().withMessage('Patient Genre is missing'),
  body('patientGenre').custom(
    (value) => (!(value !== 'Male' && value !== 'Female' && value !== 'Other')),
  ).withMessage('Patient Genre is invalid'),
  appointmentsController.createAppointment);

export default appointmentsRoutes;
