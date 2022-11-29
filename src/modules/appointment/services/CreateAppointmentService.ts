import { Appointment } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import axios from 'axios';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  patientId: string;
  doctorId: string;
  doctorSpeciality: string;
  transport: string;
  fuel: string;
  patientCep: string;
  establishment: string;
  establishmentCep: string;
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
  ) { }

  public async execute({
    companyId,
    patientId,
    doctorId,
    patientCep,
    establishmentCep,
    establishment,
    doctorSpeciality,
    fuel,
    patientSex,
    reason,
    type,
    transport,
  }: IRequest): Promise<Appointment> {
    const user = await this.usersRepository.findById(companyId);

    if (!user) throw new AppError('Company Id is not valid', 400);

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

    let CO2 = 0; // Fórmula do cálculo de CO2

    if (transport === 'car') {
      const emissionFactor: IPair = {
        gasoline: 2.212,
        diesel: 2.603,
        gnv: 1.999,
      };
      const perc: IPair = {
        gasoline: 0.27,
        diesel: 0.112,
        gnv: 0,
      };
      CO2 = (0.06329 * distance * (1 - perc[fuel])) * (emissionFactor[fuel] / 1000);
    } else if (transport === 'bus') {
      const emissionFactor = originCity !== destinyCity ? 0.028 : 0.126;
      CO2 = distance * emissionFactor * ((1 - 0.112) / 1000);
    } else if (transport === 'subway' || transport === 'train') {
      const emissionFactor = transport === 'subway' ? 11.5 : 16.75;
      CO2 = distance * (emissionFactor / 1000);
    } else if (transport === 'airplane') {
      const emissionFatorML = distance <= 3700 ? 0.0744444 : 0.0936204;
      const emissionFactor = distance <= 500 ? 0.1191759 : emissionFatorML;
      CO2 = distance * emissionFactor * (1.08 / 1000);
    } else if (transport === 'ship') {
      CO2 = distance * (0.019 / 1000);
    }

    const generatedCC = 0; // Fórmula do cálculo de créditos de carbono

    const appointment = await this.appointmentsRepository.create({
      patientId,
      companyId,
      doctorId,
      distance,
      CO2,
      generatedCC,
      establishment,
      doctorSpeciality,
      fuel,
      patientSex,
      reason,
      type,
      transport,
      patientCep,
      establishmentCep,
      city: originCity,
      state: originState,
    });

    return appointment;
  }
}
