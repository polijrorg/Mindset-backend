import { Course } from '@prisma/client';
import ICreateCourseDTO from '../dtos/ICreateVideoClassDTO';

interface ICoursesRepository {
  // findByEmailWithRelations(email: string): Promise<User | undefined>;
  // findByEmailPhoneOrCpf(email: string, phone: string, cpf: string): Promise<User | undefined>;
  create(data: ICreateCourseDTO): Promise<Course>;
  // save(data: User): ;
}

export default ICoursesRepository;
