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

  public async getSumCarbonPerTime(id: string, year: number): Promise<number[]> {
    const range = [
      new Date(year, 0),
      new Date(year, 1),
      new Date(year, 2),
      new Date(year, 3),
      new Date(year, 4),
      new Date(year, 5),
      new Date(year, 6),
      new Date(year, 7),
      new Date(year, 8),
      new Date(year, 9),
      new Date(year, 10),
      new Date(year, 11),
    ];
    const carbomPerTime: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    carbomPerTime[0] = (await this.ormRepository.aggregate({
      where: {
        companyId: id,
        created_at: {
          lte: range[1],
          gte: range[0],
        },
      },
      _sum: {
        CO2: true,
      },
    }))._sum.CO2 || 0;
    carbomPerTime[1] = (await this.ormRepository.aggregate({
      where: {
        companyId: id,
        created_at: {
          lte: range[2],
          gte: range[1],
        },
      },
      _sum: {
        CO2: true,
      },
    }))._sum.CO2 || 0;
    carbomPerTime[2] = (await this.ormRepository.aggregate({
      where: {
        companyId: id,
        created_at: {
          lte: range[3],
          gte: range[2],
        },
      },
      _sum: {
        CO2: true,
      },
    }))._sum.CO2 || 0;
    carbomPerTime[3] = (await this.ormRepository.aggregate({
      where: {
        companyId: id,
        created_at: {
          lte: range[4],
          gte: range[3],
        },
      },
      _sum: {
        CO2: true,
      },
    }))._sum.CO2 || 0;
    carbomPerTime[4] = (await this.ormRepository.aggregate({
      where: {
        companyId: id,
        created_at: {
          lte: range[5],
          gte: range[4],
        },
      },
      _sum: {
        CO2: true,
      },
    }))._sum.CO2 || 0;
    carbomPerTime[5] = (await this.ormRepository.aggregate({
      where: {
        companyId: id,
        created_at: {
          lte: range[6],
          gte: range[5],
        },
      },
      _sum: {
        CO2: true,
      },
    }))._sum.CO2 || 0;
    carbomPerTime[6] = (await this.ormRepository.aggregate({
      where: {
        companyId: id,
        created_at: {
          lte: range[7],
          gte: range[6],
        },
      },
      _sum: {
        CO2: true,
      },
    }))._sum.CO2 || 0;
    carbomPerTime[7] = (await this.ormRepository.aggregate({
      where: {
        companyId: id,
        created_at: {
          lte: range[8],
          gte: range[7],
        },
      },
      _sum: {
        CO2: true,
      },
    }))._sum.CO2 || 0;
    carbomPerTime[8] = (await this.ormRepository.aggregate({
      where: {
        companyId: id,
        created_at: {
          lte: range[9],
          gte: range[8],
        },
      },
      _sum: {
        CO2: true,
      },
    }))._sum.CO2 || 0;
    carbomPerTime[9] = (await this.ormRepository.aggregate({
      where: {
        companyId: id,
        created_at: {
          lte: range[10],
          gte: range[9],
        },
      },
      _sum: {
        CO2: true,
      },
    }))._sum.CO2 || 0;
    carbomPerTime[10] = (await this.ormRepository.aggregate({
      where: {
        companyId: id,
        created_at: {
          lte: range[11],
          gte: range[10],
        },
      },
      _sum: {
        CO2: true,
      },
    }))._sum.CO2 || 0;
    carbomPerTime[11] = (await this.ormRepository.aggregate({
      where: {
        companyId: id,
        created_at: {
          lte: new Date(year + 1, 1),
          gte: range[11],
        },
      },
      _sum: {
        CO2: true,
      },
    }))._sum.CO2 || 0;

    return carbomPerTime;
  }

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
