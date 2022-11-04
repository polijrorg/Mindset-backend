import { Appointment } from '@prisma/client';

import ICreateUserDTO from '../dtos/ICreateAppointmentDTO';

export interface ISums {
  distance: number | null;
  generatedCC: number | null;
}

interface IUsersRepository {
  countTransport(transport: string, companyId: string): Promise<number>;
  sums(companyId: string): Promise<ISums>;
  create(data: ICreateUserDTO): Promise<Appointment>;
}

export default IUsersRepository;
