import { inject, injectable } from 'tsyringe';

import { User } from '@prisma/client';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
  defaultTransport?: string;
  defaultFuel?: string;
  enableResoluteness?: boolean;
}

@injectable()
export default class ChangeConfigsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({
    id, defaultFuel, defaultTransport, enableResoluteness,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.update(id, {
      defaultFuel,
      defaultTransport,
      enableResoluteness,
    });

    return user;
  }
}
