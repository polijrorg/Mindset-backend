import { container } from 'tsyringe';

import './providers';

// Users
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';

// Courses
import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import CoursesRepository from '@modules/courses/infra/prisma/repositories/CoursesRepository';

// VideoClasses
import IVideoClassesRepository from '@modules/videoClasses/repositories/IVideoClassesRepository';
import VideoClassesRepository from '@modules/videoClasses/infra/prisma/repositories/VideoClassesRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<ICoursesRepository>('CoursesRepository', CoursesRepository);
container.registerSingleton<IVideoClassesRepository>('VideoClassesRepository', VideoClassesRepository);
