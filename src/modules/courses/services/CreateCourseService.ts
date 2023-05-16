import { inject, injectable } from 'tsyringe';

import { Course } from '@prisma/client';

import ICoursesRepository from '../repositories/ICoursesRepository';

interface IRequest {
  name: string;
  numberOfVideos:number;
  avatar:string;
  createdBy: string;
  description:string;
  rating:number;
  userId:string;
  introVideo:string;
  price:number;
}

@injectable()
export default class CreateCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

  ) { }

  public async execute({
    name,
    numberOfVideos,
    createdBy,
    description,
    avatar,
    rating,
    userId,
    introVideo,
    price,

  }: IRequest): Promise<Course> {
    // const userAlreadyExists = await this.usersRepository.findByEmailPhoneOrCpf(email, phone, cpf);

    // if (userAlreadyExists) throw new AppError('User with same name, phone or cpf already exists');

    // const hashedPassword = await this.hashProvider.generateHash(password);
    const course = this.coursesRepository.create({
      name,
      numberOfVideos,
      avatar,
      createdBy,
      description,
      rating,
      userId,
      introVideo,
      price,
    });
    console.log(userId);
    return course;
  }
}
