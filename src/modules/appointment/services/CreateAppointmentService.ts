import { Appointment } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import axios from 'axios';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IEstablishmentsRepository from '@modules/establishment/repositories/IEstablishmentsRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  patientId: string;
  doctorId: string;
  doctorSpeciality: string;
  transport: string;
  fuel: string;
  patientCep: string;
  establishmentCode: number;
  reason: string;
  type: string;
  patientSex: string;
  companyId: string;
}

interface IAddress {
  city: string;
  state: string;
  district: string;
  address: string;
}

interface IPair {
  [key: string]: number
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('EstablishmentsRepository')
    private establishmentRepository: IEstablishmentsRepository,
  ) { }

  public async execute({
    companyId,
    patientId,
    doctorId,
    patientCep,
    establishmentCode,
    doctorSpeciality,
    fuel,
    patientSex,
    reason,
    type,
    transport,
  }: IRequest): Promise<Appointment> {
    const user = await this.usersRepository.findById(companyId);
    const establishment = await this.establishmentRepository.findByCode(establishmentCode);

    if (!user) throw new AppError('Company Id is not valid', 400);
    if (!establishment) throw new AppError('Establishment code is not valid', 400);

    const establishmentCep = `${establishment.cep.toString().slice(0, 5)}-${establishment.cep.toString().slice(5)}`;

    const patientLocationResponse = await axios.get(`https://cdn.apicep.com/file/apicep/${patientCep}.json`);

    const establishmentLocationResponse = await axios.get(`https://cdn.apicep.com/file/apicep/${establishmentCep}.json`);

    const {
      city: originCity,
      state: originState,
      district: originDistrict,
      address: originAddress,
    }: IAddress = patientLocationResponse.data;
    const origin = `
      ${originAddress.replace(' ', '%20').replace(',', '%2C')}
      ${originDistrict.replace(' ', '%20').replace(',', '%2C')}
      ${originCity.replace(' ', '%20').replace(',', '%2C')}
      ${originState.replace(' ', '%20').replace(',', '%2C')}
    `;

    const {
      city: destinyCity,
      state: destinyState,
      district: destinyDistrict,
      address: destinyAddress,
    }: IAddress = establishmentLocationResponse.data;
    const destination = `
      ${destinyAddress.replace(' ', '%20').replace(',', '%2C')}
      ${destinyDistrict.replace(' ', '%20').replace(',', '%2C')}
      ${destinyCity.replace(' ', '%20').replace(',', '%2C')}
      ${destinyState.replace(' ', '%20').replace(',', '%2C')}
    `;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&key=${process.env.GOOGLE_API_KEY}`;

    const distanceArrayResponse = await axios.get(url);

    const distance: number = distanceArrayResponse.data.rows[0].elements[0].distance.value;

    const gwp = {
      CO2: 1,
      CH4: 28,
      N2O: 265,
    };

    let CO2 = 0;
    let CH4 = 0;
    let N2O = 0;
    let CO2e = 0;

    if (transport === 'car') {
      const emissionFactorCO2: IPair = {
        gasoline: 2.212,
        diesel: 2.603,
        gnv: 1.999,
      };
      const emissionFactorCH4: IPair = {
        gasoline: 0.0003,
        diesel: 0.002,
      };
      const emissionFactorN2O: IPair = {
        gasoline: 0.0002,
        diesel: 0.001,
      };
      const perc: IPair = {
        gasoline: 0.27,
        diesel: 0.112,
        gnv: 0,
      };
      CO2 = (0.06329 * distance * (1 - perc[fuel])) * (emissionFactorCO2[fuel] / 1000);
      if (fuel !== 'gnv') {
        CH4 = 0.06329 * distance * (emissionFactorCH4[fuel] / 1000);
        N2O = 0.06329 * distance * (emissionFactorN2O[fuel] / 1000);
      }
    } else if (transport === 'bus') {
      const emissionFactorCO2 = originCity !== destinyCity ? 0.028 : 0.126;
      CO2 = distance * emissionFactorCO2 * ((1 - 0.112) / 1000);

      const emissionFactorCH4DieselOil = originCity !== destinyCity ? 0.000001 : 0.000007;
      const emissionFactorCH4BioDiesel = originCity !== destinyCity ? 0.000004 : 0.00002;

      const emissionFactorN2ODieselOil = originCity !== destinyCity ? 0.000001 : 0.000007;
      const emissionFactorN2OBioDiesel = originCity !== destinyCity ? 0.00000021 : 0.000001;

      const emissionDieselOilCH4 = distance * emissionFactorCH4DieselOil * ((1 - 0.112) / 1000);
      const emissionBioDieselCH4 = distance * emissionFactorCH4BioDiesel * ((1 - 0.112) / 1000);

      const emissionDieselOilN2O = distance * emissionFactorN2ODieselOil * ((1 - 0.112) / 1000);
      const emissionBioDieselN2O = distance * emissionFactorN2OBioDiesel * ((1 - 0.112) / 1000);

      CH4 = emissionBioDieselCH4 + emissionDieselOilCH4;
      N2O = emissionBioDieselN2O + emissionDieselOilN2O;
    } else if (transport === 'subway' || transport === 'train') {
      const emissionFactor = transport === 'subway' ? 11.5 : 16.75;
      CO2 = distance * (emissionFactor / 1000);
    } else if (transport === 'airplane') {
      const FE_short = {
        CO2: 0.1191759,
        CH4: 0.0000037,
        N2O: 0.0000038,
      };
      const FE_average = {
        CO2: 0.0744444,
        CH4: 0.0000004,
        N2O: 0.0000024,
      };
      const FE_long = {
        CO2: 0.0936204,
        CH4: 0.0000004,
        N2O: 0.0000030,
      };

      const emissionFatorMLCO2 = distance <= 3700 ? FE_average.CO2 : FE_long.CO2;
      const emissionFactorCO2 = distance <= 500 ? FE_short.CO2 : emissionFatorMLCO2;

      const emissionFatorMLCH4 = distance <= 3700 ? FE_average.CH4 : FE_long.CH4;
      const emissionFactorCH4 = distance <= 500 ? FE_short.CH4 : emissionFatorMLCH4;

      const emissionFatorMLN2O = distance <= 3700 ? FE_average.N2O : FE_long.N2O;
      const emissionFactorN2O = distance <= 500 ? FE_short.N2O : emissionFatorMLN2O;

      CO2 = distance * emissionFactorCO2 * (1.08 / 1000);
      CH4 = distance * emissionFactorCH4 * (1.08 / 1000);
      N2O = distance * emissionFactorN2O * (1.08 / 1000);
    } else if (transport === 'ship') {
      CO2 = distance * (0.019 / 1000);
      CH4 = distance * (0.000001 / 1000);
      N2O = distance * (0.000001 / 1000);
    }

    CO2e = CO2 * gwp.CO2 + CH4 * gwp.CH4 + N2O * gwp.N2O;

    const generatedCC = CO2e;

    const appointment = await this.appointmentsRepository.create({
      patientId,
      companyId,
      doctorId,
      distance,
      CO2: CO2e,
      generatedCC,
      establishmentId: establishment.cnesCode,
      doctorSpeciality,
      fuel,
      patientSex,
      reason,
      type,
      transport,
      patientCep,
      city: originCity,
      state: originState,
    });

    return appointment;
  }
}
