import { Establishment } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import ICreateEstablishmentDTO from '../dtos/ICreateEstablishmentDTO';

import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';

@injectable()
export default class CreateEstablishmentService {
  constructor(
    @inject('EstablihsmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) { }

  public async execute({
    address, cep, cnesCode, district, fantasyName, latitude, longitude, place,
  }: ICreateEstablishmentDTO): Promise<Establishment> {
    const establishment = this.establishmentsRepository.create({
      address,
      cep,
      cnesCode,
      district,
      fantasyName,
      latitude,
      longitude,
      place,
    });

    return establishment;
  }
}
