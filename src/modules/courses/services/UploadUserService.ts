import { inject, injectable } from 'tsyringe';

import { Course } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';

interface IRequest {
  id:string,
  photoFile: Express.Multer.File
}

@injectable()
export default class UploadVideoService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

  ) {}

  public async execute({
    id,
    photoFile,
  }: IRequest): Promise<Course> {
    const courseFound = await this.coursesRepository.findById(id);
    if (!courseFound) throw new AppError('course not found', 400);

    if (!photoFile) throw new AppError('You cannot create a course without a photo.');

    const video = photoFile.location;
    console.log(video);
    const course = this.coursesRepository.uploadVideo(id, video);
    return course;
  }
}
