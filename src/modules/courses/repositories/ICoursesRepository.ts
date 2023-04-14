import { Course } from '@prisma/client';

import ICreateCourseDTO from '../dtos/ICreateCourseDTO';

interface ICoursesRepository {
  create(data: ICreateCourseDTO): Promise<Course>;
  listPopular(): Promise<Course[]>;
  listById(id:string): Promise<Course[]>;
  search(data:string): Promise<Course[]>;
  // findByEmailWithRelations(email: string): Promise<User | undefined>;
  // findByEmailPhoneOrCpf(email: string, phone: string, cpf: string): Promise<User | undefined>;
  // save(data: User): ;
}

export default ICoursesRepository;
