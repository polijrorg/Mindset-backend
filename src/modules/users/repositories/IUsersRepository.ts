import { User } from '@prisma/client';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

interface IUsersRepository {

  findById(id: string): Promise<User | null>;
  update(id: string, data: IUpdateUserDTO): Promise<User>;
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email:string):Promise<User | null>;
  delete(id:string): Promise<User>;

}

export default IUsersRepository;
