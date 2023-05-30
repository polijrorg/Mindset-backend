import { inject, injectable } from 'tsyringe';

import { Course } from '@prisma/client';

import AppError from '@shared/errors/AppError';
import ICoursesRepository from '../repositories/ICoursesRepository';

@injectable()
export default class GetByIdService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

  ) { }

  public async execute(id:string): Promise<Course> {
    const courses = await this.coursesRepository.findById(id);
    if (!courses) throw new AppError('Course not found');

    return courses;
  }
}
