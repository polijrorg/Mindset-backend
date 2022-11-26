import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  id: string;
  year: number;
}

@injectable()
export default class GetCarbonPerTimeDataService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentssRepository: IAppointmentsRepository,
  ) { }

  public async execute({ id, year }: IRequest): Promise<number[]> {
    const carbomPerTime = await this.appointmentssRepository.getSumCarbonPerTime(id, year);

    return carbomPerTime;
  }
}
