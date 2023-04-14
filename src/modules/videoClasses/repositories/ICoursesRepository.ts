import { Course } from '@prisma/client';

import ICreateCourseDTO from '../dtos/ICreateVideoClassDTO';

interface ICoursesRepository {

  create(data: ICreateCourseDTO): Promise<Course>;
  // findByEmailWithRelations(email: string): Promise<User | undefined>;
  // findByEmailPhoneOrCpf(email: string, phone: string, cpf: string): Promise<User | undefined>;
  // save(data: User): ;

}

export default ICoursesRepository;
