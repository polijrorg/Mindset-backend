import { inject, injectable } from 'tsyringe';

import { User } from '@prisma/client';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
  password: string;
}

@injectable()
export default class ChangePasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ id, password }: IRequest): Promise<User> {
    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.update(id, { password: hashedPassword });

    return user;
  }
}
