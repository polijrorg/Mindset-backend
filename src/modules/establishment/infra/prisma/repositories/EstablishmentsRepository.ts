import prisma from '@shared/infra/prisma/client';
import { Prisma, Establishment } from '@prisma/client';

import IEstablishmentsRepository from '@modules/establishment/repositories/IEstablishmentsRepository';
import ICreateEstablishmentDTO from '@modules/establishment/dtos/ICreateEstablishmentDTO';

export default class EstablishmentsRepository implements IEstablishmentsRepository {
  private ormRepository: Prisma.EstablishmentDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.establishment;
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
    const establishment = await this.ormRepository.findFirst({
      where: {
        cnesCode: code,
      },
    });

    return establishment;
  }

  async update(data: ICreateEstablishmentDTO): Promise<void> {
    await this.ormRepository.update({
      where: { cnesCode: data.cnesCode },
      data,
    });
  }

  async deleteAll(): Promise<void> {
    await this.ormRepository.deleteMany();
  }

  async create(data: ICreateEstablishmentDTO): Promise<Establishment> {
    const establishment = await this.ormRepository.create({ data });

    return establishment;
  }
}
