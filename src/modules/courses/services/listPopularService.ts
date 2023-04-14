import { inject, injectable } from 'tsyringe';

import { Course } from '@prisma/client';

import ICoursesRepository from '../repositories/ICoursesRepository';

@injectable()
export default class listPopularService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

  ) { }

  public async execute(): Promise<Course[]> {
    const course = await this.coursesRepository.listPopular();

    return course;
  }
}
