import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository, { ITable } from '../repositories/IAppointmentsRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class ListAppointmentTableService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentssRepository: IAppointmentsRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<ITable[]> {
    const table = await this.appointmentssRepository.listAppointments(id);

    return table;
  }
}
