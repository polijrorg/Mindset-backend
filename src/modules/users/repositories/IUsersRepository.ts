import { Users } from '@prisma/client';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

interface IUsersRepository {
  findByEmailWithRelations(email: string): Promise<Users | null>;
  findByEmail(email: string): Promise<Users | null>;
  create(data: ICreateUserDTO): Promise<Users>;
}

export default IUsersRepository;
