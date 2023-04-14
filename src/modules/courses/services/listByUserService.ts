import { inject, injectable } from 'tsyringe';

import { Course } from '@prisma/client';

import ICoursesRepository from '../repositories/ICoursesRepository';

@injectable()
export default class listByUserService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

  ) { }

  public async execute(id:string): Promise<Course[]> {
    const courses = await this.coursesRepository.listById(id);

    return courses;
  }
}
