import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository, { ISpeciality } from '../repositories/IAppointmentsRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class GetSpecialityDataService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentssRepository: IAppointmentsRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<ISpeciality[]> {
    const specialityData = await this.appointmentssRepository.listSpecilities(id);

    return specialityData;
  }
}
