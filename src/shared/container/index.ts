import { container } from 'tsyringe';

import './providers';

// Users
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';

// Appointments
import IAppointmentsRepository from '@modules/appointment/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointment/infra/prisma/repositories/AppointmentsRepository copy';

// Establishment
import IEstablishmentsRepository from '@modules/establishment/repositories/IEstablishmentsRepository';
import EstablishmentsRepository from '@modules/establishment/infra/prisma/repositories/EstablishmentsRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);
container.registerSingleton<IEstablishmentsRepository>('EstablishmentsRepository', EstablishmentsRepository);
