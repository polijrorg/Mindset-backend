import { Course } from '@prisma/client';
import ICreateCourseDTO from '../dtos/ICreateCourseDTO';

interface ICoursesRepository {
  // findByEmailWithRelations(email: string): Promise<User | undefined>;
  // findByEmailPhoneOrCpf(email: string, phone: string, cpf: string): Promise<User | undefined>;
  create(data: ICreateCourseDTO): Promise<Course>;
  listPopular(): Promise<Course[]>;
  // save(data: User): ;
}

export default ICoursesRepository;
