import { Establishment } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import axios from 'axios';
import { inject, injectable } from 'tsyringe';

import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';

@injectable()
export default class FindNearestEstablishmentService {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) { }

  public async execute(patientCep:string): Promise<Establishment> {
    const urlc = `https://maps.googleapis.com/maps/api/geocode/json?address=${patientCep}&key=${process.env.GOOGLE_API_KEY}`;
    console.log(urlc);

    const cepCords = await axios.get(urlc);
    console.log(cepCords);

    const {
      lat,
      lng,

    } = cepCords.data.results[0].geometry.location;

    const establishmentsCep = await this.establishmentsRepository.findNearest(lat, lng);

    if (!establishmentsCep) throw new AppError('Establishment no found', 400);

    let near = 1;
    let nearestEstablishment:any;

    await establishmentsCep.forEach((establishment) => {
      if (establishment.latitude !== null && establishment.longitude !== null && ((establishment.latitude - lat) ** 2 + (establishment.longitude - lng) ** 2) < near) {
        near = ((establishment.latitude - lat) ** 2 + (establishment.longitude - lng) ** 2);
        nearestEstablishment = establishment;
      }
    });

    return nearestEstablishment;
  }
}
