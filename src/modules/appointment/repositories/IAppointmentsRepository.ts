import { Appointment } from '@prisma/client';

import ICreateUserDTO from '../dtos/ICreateAppointmentDTO';

export interface ISums {
  distance: number | null;
  generatedCC: number | null;
  CO2: number | null;
}

export interface IGenre {
  male: number;
  female: number;
  others: number;
}

export interface ITable {
  patientId: string;
  doctorId: string;
  transport: string;
  distance: number;
  doctorSpeciality: string;
  fuel: string;
  state: string;
  generatedCC: number;
}

interface IUsersRepository {
  countTransport(transport: string, companyId: string): Promise<number>;
  sums(companyId: string): Promise<ISums>;
  countGenre(id: string): Promise<IGenre>;
  countDoctors(id: string): Promise<number>;
  countPatients(id: string): Promise<number>;
  countCities(id: string): Promise<number>;
  countDoctorSpecialities(id: string): Promise<number>;
  countAppointments(id: string): Promise<number>;
  listAppointments(id: string): Promise<ITable[]>;
  create(data: ICreateUserDTO): Promise<Appointment>;
}

export default IUsersRepository;
