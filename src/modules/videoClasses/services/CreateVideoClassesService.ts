import { inject, injectable } from 'tsyringe';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import { Course } from '@prisma/client';

import ICoursesRepository from '../repositories/IVideoClassesRepository';

interface IRequest {
  name: string;
  numberOfVideos:number;
  avatar:string;
  createdBy: string;
  description:string;
  rating:number;
  userId:string
}

@injectable()
export default class CreateVideoClassesService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute({
    name,
    numberOfVideos,
    createdBy,
    description,
    avatar,
    rating,
    userId,
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
    });

    return course;
  }
}
