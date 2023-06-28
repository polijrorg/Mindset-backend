import prisma from '@shared/infra/prisma/client';

import { Prisma, Producer } from '@prisma/client';

import IProducersRepository from '@modules/producers/repositories/IProducersRepository';
import ICreateProducersDTO from '@modules/producers/dtos/ICreateProducersDTO';

export default class ProducersRepository implements IProducersRepository {
  private ormRepository: Prisma.ProducerDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.producer;
  }

  public async create(data: ICreateProducersDTO): Promise<Producer> {
    const newProducer = await this.ormRepository.create({ data });

    return newProducer;
  }

  // public async delete(id:string): Promise<Producer> {
  //   const user = await this.ormRepository.delete({ where: { id } });

  //   return user;
  // }
}
