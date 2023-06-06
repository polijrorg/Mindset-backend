import { inject, injectable } from 'tsyringe';

import { Course } from '@prisma/client';

import AppError from '@shared/errors/AppError';
import ICoursesRepository from '../repositories/ICoursesRepository';

@injectable()
export default class RateCourseByIdService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

  ) { }

  public async execute(id:string, rate:number): Promise<Course> {
    const course = await this.coursesRepository.findById(id);
    if (!course) throw new AppError('Course not found');

    if (course.rating === null) {
      const updatedCourse = await this.coursesRepository.updateRating(id, rate);
      return updatedCourse;
    }
    const updatedCourse = await this.coursesRepository.updateRating(id, (parseFloat(course.rating) + rate) / 2);
    return updatedCourse;
  }
}
