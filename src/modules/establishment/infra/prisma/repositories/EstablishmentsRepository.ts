import prisma from '@shared/infra/prisma/client';
import { Prisma, Establishment } from '@prisma/client';

import IEstablishmentsRepository from '@modules/establishment/repositories/IEstablishmentsRepository';
import ICreateEstablishmentDTO from '@modules/establishment/dtos/ICreateEstablishmentDTO';

export default class EstablishmentsRepository implements IEstablishmentsRepository {
  private ormRepository: Prisma.EstablishmentDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.establishment;
  }

  async create(data: ICreateEstablishmentDTO): Promise<Establishment> {
    const establishment = await this.ormRepository.create({ data });

    return establishment;
  }

  async findById(id: string): Promise<Establishment | null> {
    const establishment = await this.ormRepository.findUnique({
      where: {
        id,
      },
    });

    return establishment;
  }

  async findByCode(code: number): Promise<Establishment | null> {
    const establishment = await this.ormRepository.findUnique({
      where: {
        cnesCode: code,
      },
    });

    return establishment;
  }
}
