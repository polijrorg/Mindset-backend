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

  public async findNearest(lat:number, lng:number): Promise<Establishment[]|null > {
    const nearestEstablishment = await this.ormRepository.findMany({
      where: {
        AND: {
          latitude: { lte: (Math.trunc((lat) + 1)), gte: (Math.trunc((lat) - 1)) },
          longitude: { lte: (Math.trunc((lng) + 1)), gte: (Math.trunc((lng) - 1)) },
        },
      },
    });

    return nearestEstablishment;
  }

  public async findRandom(): Promise<Establishment[] | null> {
    const randomEstablishment = await this.ormRepository.findMany({
      take: 1000,
    });

    return randomEstablishment;
  }
}
