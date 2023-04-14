import { container } from 'tsyringe';

import './providers';

// Users
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';

// Courses
import CoursesRepository from '@modules/courses/infra/prisma/repositories/CoursesRepository';
import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<ICoursesRepository>('CoursesRepository', CoursesRepository);
