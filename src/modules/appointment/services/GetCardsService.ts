import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  id: string;
}

interface IResponse {
  distance: number;
  generatedCC: number;
  car: number;
  airplane: number;
  train: number;
  bus: number;
  ship: number;
  truck: number;
}

@injectable()
export default class GetCardsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentssRepository: IAppointmentsRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<IResponse> {
    const sums = await this.appointmentssRepository.sums(id);
    const car = await this.appointmentssRepository.countTransport('Carro', id);
    const airplane = await this.appointmentssRepository.countTransport('Avião', id);
    const train = await this.appointmentssRepository.countTransport('Trem', id);
    const bus = await this.appointmentssRepository.countTransport('Onibus', id);
    const ship = await this.appointmentssRepository.countTransport('Barco', id);
    const truck = await this.appointmentssRepository.countTransport('Caminhão', id);

    return {
      distance: sums.distance || 0,
      generatedCC: sums.generatedCC || 0,
      car,
      airplane,
      train,
      bus,
      ship,
      truck,
    };
  }
}
