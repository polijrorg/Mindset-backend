import { inject, injectable } from 'tsyringe';

import { User } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {

  phone:string;
  code:number
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

  ) { }

  public async execute({ phone, code }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByPhone(phone);

    if (!user) throw new AppError('User not found', 400);
    if (user.code !== code) throw new AppError('Wrong Code', 400);
    console.log(user);

    return user;
  }
}
