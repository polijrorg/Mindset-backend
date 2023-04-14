import prisma from '@shared/infra/prisma/client';

import { Prisma, User } from '@prisma/client';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.user;
  }

  // public async findByEmailWithRelations(email: string): Promise<User | null> {
  //   const user = await this.ormRepository.findFirst({
  //     where: { email },
  //   });

  //   return user;
  // }

  public async findById(id: string): Promise<User | null> {
    const user = await this.ormRepository.findUnique({
      where: { id },
    });

    return user;
  }

  public async update(id: string, data: IUpdateUserDTO): Promise<User> {
    const updatedUser = await this.ormRepository.update({ where: { id }, data });

    return updatedUser;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const newUser = await this.ormRepository.create({ data });

    return newUser;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const userEmail = await this.ormRepository.findUnique({
      where: { email },
    });

    return userEmail;
  }
}
