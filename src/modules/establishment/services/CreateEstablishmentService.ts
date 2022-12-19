import { inject, injectable } from 'tsyringe';

import { Establishment } from '@prisma/client';

import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';

interface IRequest {
  cnesCode: number;
  fantasyName: string;
  cep: number;
  address: string;
  latitude: number;
  longitude: number;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('EstablihsmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) { }

  public async execute({
    cep, fantasyName, cnesCode, address, latitude, longitude,
  }: IRequest): Promise<Establishment> {
    const establishment = await this.establishmentsRepository.create({
      cep, fantasyName, cnesCode, address, latitude, longitude,
    });

    return establishment;
  }
}
