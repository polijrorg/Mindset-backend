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

  public async listByUserId(id:string): Promise<Course[]> {
    const course = await this.ormRepository.findMany({
      where: { userId: id },
    });
    return course;
  }

  public async search(data:string): Promise<Course[]> {
    const course = await this.ormRepository.findMany({
      take: 6,
      where: { name: { contains: data } },
    });
    return course;
  }

  public async findById(id:string): Promise<Course|null> {
    const course = await this.ormRepository.findUnique({

      where: { id },
    });
    return course;
  }

  public async uploadVideo(id: string, video: string): Promise<Course> {
    const user = await this.ormRepository.update({ where: { id }, data: { introVideo: video } });

    return user;
  }
}
