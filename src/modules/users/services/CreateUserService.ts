import { inject, injectable } from 'tsyringe';

import { User } from '@prisma/client';

// import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name:string,
  email:string,
  password:string

}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    if (email === '') throw new AppError('Email area is empty', 400);

    // if (userAlreadyExists) throw new AppError('User with same email already exists', 400);
    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return user;
  }
}
