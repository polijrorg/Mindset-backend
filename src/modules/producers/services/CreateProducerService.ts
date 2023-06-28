import { inject, injectable } from 'tsyringe';

import { Producer } from '@prisma/client';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import IProducersRepository from '../repositories/IProducersRepository';
import ICreateProducersDTO from '../dtos/ICreateProducersDTO';

@injectable()
export default class CreateProducerService {
  constructor(
    @inject('ProducersRepository')
    private producersRepository: IProducersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute({
    name,
    cpf,
    birthdayDate,
    course,
    rgFront,
    rgBack,
    rgNumber,
    curriculum,
  }: ICreateProducersDTO): Promise<Producer> {
    const producer = await this.producersRepository.create({

      name,
      cpf,
      birthdayDate,
      course,
      rgFront,
      rgBack,
      rgNumber,
      curriculum,
    });

    return producer;
  }
}
