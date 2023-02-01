import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';

@injectable()
export default class FindRandomEstablishmentService {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) { }

  public async execute(): Promise<number> {
    const randomEstablishment = await this.establishmentsRepository.findRandom();

    if (!randomEstablishment) throw new AppError('Establishment not found', 400);

    const establishment = randomEstablishment[0];

    return establishment.cnesCode;
  }
}
