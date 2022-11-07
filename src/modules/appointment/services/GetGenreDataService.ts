import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository, { IGenre } from '../repositories/IAppointmentsRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class GetGenreDataService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentssRepository: IAppointmentsRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<IGenre> {
    const genreData = await this.appointmentssRepository.countGenre(id);

    return genreData;
  }
}
