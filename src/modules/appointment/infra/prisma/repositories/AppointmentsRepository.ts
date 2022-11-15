import prisma from '@shared/infra/prisma/client';
import { Prisma, Appointment } from '@prisma/client';

import IAppointmentsRepository, {
  ISums, ISex, ITable, ISpeciality,
} from '@modules/appointment/repositories/IAppointmentsRepository';
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
    const aggregate = await this.ormRepository.aggregate({
      where: { companyId },
      _sum: { distance: true, generatedCC: true, CO2: true },
    });

    return aggregate._sum;
  }

  public async countSex(id: string): Promise<ISex> {
    const male = await this.ormRepository.count({ where: { companyId: id, patientSex: 'Male' } });
    const female = await this.ormRepository.count({ where: { companyId: id, patientSex: 'Female' } });

    return {
      male,
      female,
    };
  }

  public async countDoctors(id: string): Promise<number> {
    const doctorsArray = await this.ormRepository.groupBy({
      where: { companyId: id },
      by: ['doctorId'],
    });

    return doctorsArray.length;
  }

  public async countPatients(id: string): Promise<number> {
    const patientsArray = await this.ormRepository.groupBy({
      where: { companyId: id },
      by: ['patientId'],
    });

    return patientsArray.length;
  }

  public async countCities(id: string): Promise<number> {
    const cityArray = await this.ormRepository.groupBy({
      where: { companyId: id },
      by: ['city'],
    });

    return cityArray.length;
  }

  public async countDoctorSpecialities(id: string): Promise<number> {
    const doctorSpecialityArray = await this.ormRepository.groupBy({
      where: { companyId: id },
      by: ['doctorSpeciality'],
    });

    return doctorSpecialityArray.length;
  }

  public async countAppointments(id: string): Promise<number> {
    const appointments = await this.ormRepository.count({
      where: { companyId: id },
    });

    return appointments;
  }

  public async listAppointments(id: string): Promise<ITable[]> {
    const appointments = await this.ormRepository.findMany({
      where: { companyId: id },
      select: {
        patientId: true,
        doctorId: true,
        transport: true,
        distance: true,
        doctorSpeciality: true,
        fuel: true,
        state: true,
        generatedCC: true,
      },
    });

    return appointments;
  }

  // public async sumCarbomPerTime(id: string, since: number, divisions: number, part: number): Promise<number[]> {
  //   const now = new Date();
  //   const nowYear = now.getFullYear();
  //   const nowMonth = now.getMonth();

  //   let nowPart = 0;
  //   while (((nowPart + 1) * divisions) < nowMonth) nowPart += 1;

  //   const carbomPerTime: number[] = [];
  //   for (let y = since; y <= nowYear; y += 1) {
  //     const until = y !== nowYear ? divisions : nowPart;

  //     for (let p = part; p <= until; p += 1) {
  //       const carbom = await this.ormRepository.aggregate({
  //         where: { companyId: id },
  //         _sum: { CO2 },

  //       })
  //     }
  //   }
  // }

  public async listSpecilities(id: string): Promise<ISpeciality[]> {
    const specilities = await this.ormRepository.groupBy({
      by: ['doctorSpeciality'],
      where: { companyId: id },
      _count: {
        doctorSpeciality: true,
      },
    });

    const specilitiesArray = [] as ISpeciality[];
    specilities.forEach((speciality) => {
      specilitiesArray.push({
        speciality: speciality.doctorSpeciality,
        number: speciality._count.doctorSpeciality,
      } as ISpeciality);
    });

    return specilitiesArray;
  }

  public async create(data: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = await this.ormRepository.create({ data });

    return appointment;
  }
}
