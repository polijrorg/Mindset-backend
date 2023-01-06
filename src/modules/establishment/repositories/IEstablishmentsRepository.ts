import { Establishment } from '@prisma/client';

import ICreateEstablishmentDTO from '../dtos/ICreateEstablishmentDTO';

interface IEstablishmentsRepository {
  findByCode(code: number): Promise<Establishment | null>;
  findById(id: string): Promise<Establishment | null>;
  update(data: ICreateEstablishmentDTO): Promise<void>;
  deleteAll(): Promise<void>;
  create(data: ICreateEstablishmentDTO): Promise<Establishment>;
}

export default IEstablishmentsRepository;
