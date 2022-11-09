import { Appointment } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import axios from 'axios';

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
  patientGenre: string;
  companyId: string;
}

interface IAddress {
  city: string;
  state: string;
  district: string;
  address: string;
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentssRepository: IAppointmentsRepository,
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
    patientGenre,
    reason,
    type,
    transport,
  }: IRequest): Promise<Appointment> {
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

    const CO2 = 0; // Fórmula do cálculo de CO2
    const generatedCC = 0; // Fórmula do cálculo de créditos de carbono

    const appointment = await this.appointmentssRepository.create({
      patientId,
      companyId,
      doctorId,
      distance,
      CO2,
      generatedCC,
      establishment,
      doctorSpeciality,
      fuel,
      patientGenre,
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
