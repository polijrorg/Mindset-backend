import prisma from '@shared/infra/prisma/client';

import { Prisma } from '@prisma/client';
import IVideoClassesRepository from '@modules/videoClasses/repositories/IVideoClassesRepository';

export default class VideosclasesRepositoryr implements IVideoClassesRepository {
  private ormRepository: Prisma.VideoDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.video;
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
}
