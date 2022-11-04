import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  id: string;
}

interface IResponse {
  distance: number;
  generatedCC: number;
  CO2: number;
  car: number;
  airplane: number;
  train: number;
  bus: number;
  ship: number;
  truck: number;
  cities: number;
  doctorSpeciality: number;
  doctors: number;
  patients: number;
  appointments: number;
}

@injectable()
export default class GetCardsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentssRepository: IAppointmentsRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<IResponse> {
    // Transports
    const car = await this.appointmentssRepository.countTransport('Carro', id);
    const airplane = await this.appointmentssRepository.countTransport('Avião', id);
    const train = await this.appointmentssRepository.countTransport('Trem', id);
    const bus = await this.appointmentssRepository.countTransport('Onibus', id);
    const ship = await this.appointmentssRepository.countTransport('Barco', id);
    const truck = await this.appointmentssRepository.countTransport('Caminhão', id);

    // Generation of Carbon Credits
    const sums = await this.appointmentssRepository.sums(id);

    // Appointments data
    const cities = await this.appointmentssRepository.countCities(id);
    const doctorSpeciality = await this.appointmentssRepository.countDoctorSpecialities(id);
    const doctors = await this.appointmentssRepository.countDoctors(id);
    const patients = await this.appointmentssRepository.countPatients(id);
    const appointments = await this.appointmentssRepository.countAppointments(id);

    return {
      car,
      airplane,
      train,
      bus,
      ship,
      truck,
      distance: sums.distance || 0,
      generatedCC: sums.generatedCC || 0,
      CO2: sums.CO2 || 0,
      cities,
      doctorSpeciality,
      doctors,
      patients,
      appointments,
    };
  }
}
