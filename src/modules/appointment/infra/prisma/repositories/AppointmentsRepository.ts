import prisma from '@shared/infra/prisma/client';
import { Prisma, Appointment } from '@prisma/client';

import IAppointmentsRepository, { ISums } from '@modules/appointment/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointment/dtos/ICreateAppointmentDTO';

export default class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Prisma.AppointmentDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.appointment;
  }

  public async countTransport(transport: string, companyId: string): Promise<number> {
    const number = await this.ormRepository.count({ where: { transport, companyId } });

    return number;
  }

  public async sums(companyId: string): Promise<ISums> {
    const aggregate = await this.ormRepository.aggregate({ where: { companyId }, _sum: { distance: true, generatedCC: true } });

    return aggregate._sum;
  }

  public async create(data: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = await this.ormRepository.create({ data });

    return appointment;
  }
}
