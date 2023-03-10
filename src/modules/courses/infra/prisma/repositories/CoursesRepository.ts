import prisma from '@shared/infra/prisma/client';
import { Course, Prisma } from '@prisma/client';

import ICreateCourseDTO from '@modules/courses/dtos/ICreateCourseDTO';
import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';

export default class CoursesRepository implements ICoursesRepository {
  private ormRepository: Prisma.CourseDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.course;
  }

  // public async findByEmailWithRelations(email: string): Promise<User | null> {
  //   const user = await this.ormRepository.findFirst({
  //     where: { email },
  //   });

  //   return user;
  // }

  public async create(data: ICreateCourseDTO): Promise<Course> {
    const course = await this.ormRepository.create({ data });
    return course;
  }

  public async listPopular(): Promise<Course[]> {
    const course = await this.ormRepository.findMany({
      take: 6,
      orderBy: [
        {
          rating: 'desc',
        }],
    });
    return course;
  }
}
