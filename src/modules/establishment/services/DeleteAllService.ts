import { inject, injectable } from 'tsyringe';

import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';

@injectable()
export default class DeleteAll {
  constructor(
    @inject('EstablihsmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) { }

  public async execute(): Promise<void> {
    await this.establishmentsRepository.deleteAll();
  }
}
