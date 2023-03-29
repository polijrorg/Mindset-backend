import { inject, injectable } from 'tsyringe';

import { User } from '@prisma/client';
import path from 'path';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
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
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    if (email === '') throw new AppError('Email area is empty', 400);

    // if (userAlreadyExists) throw new AppError('User with same email already exists', 400);
    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const templateDataFile = path.resolve(__dirname, '..', 'views', 'create_account.hbs');

    await this.mailProvider.sendMail({
      to: {
        name,
        email,
      },
      subject: 'Criação de conta',
      templateData: {
        file: templateDataFile,
        variables: { name },
      },
    });

    return user;
  }
}
