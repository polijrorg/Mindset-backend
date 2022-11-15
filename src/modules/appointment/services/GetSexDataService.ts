import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository, { ISex } from '../repositories/IAppointmentsRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class GetSexDataService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentssRepository: IAppointmentsRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<ISex> {
    const sexData = await this.appointmentssRepository.countSex(id);

    return sexData;
  }
}
