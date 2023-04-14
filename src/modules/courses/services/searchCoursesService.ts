import { inject, injectable } from 'tsyringe';

import { Course } from '@prisma/client';

import ICoursesRepository from '../repositories/ICoursesRepository';

@injectable()
export default class searchCoursesService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

  ) { }

  public async execute(data:string): Promise<Course[]> {
    const courses = await this.coursesRepository.search(data);

    return courses;
  }
}
