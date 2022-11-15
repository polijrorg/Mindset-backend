import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetCardsService from '@modules/appointment/services/GetCardsService';
import ListAppointmentTableService from '@modules/appointment/services/ListAppointmentTableService';
import GetGenreDataService from '@modules/appointment/services/GetGenreDataService';
import CreateAppointmentService from '@modules/appointment/services/CreateAppointmentService';
import GetSpecialityDataService from '@modules/appointment/services/GetSpecialityDataService';

export default class AppointmestsController {
  public async getCards(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getCards = container.resolve(GetCardsService);

    const cards = await getCards.execute({ id });

    return res.status(200).json(cards);
  }

  public async getTable(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getTable = container.resolve(ListAppointmentTableService);

    const table = await getTable.execute({ id });

    return res.status(200).json(table);
  }

  public async getGenreData(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getGenreData = container.resolve(GetGenreDataService);

    const genreData = await getGenreData.execute({ id });

    return res.status(200).json(genreData);
  }

  public async getSpecialityData(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getSpecialityData = container.resolve(GetSpecialityDataService);

    const specialityData = await getSpecialityData.execute({ id });

    return res.status(200).json(specialityData);
  }

  public async createAppointment(req: Request, res: Response): Promise<Response> {
    const {
      patientId,
      doctorId,
      companyId,
      doctorSpeciality,
      transport,
      fuel,
      patientCep,
      establishment,
      establishmentCep,
      reason,
      type,
      patientGenre,
    } = req.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      patientId,
      doctorId,
      companyId,
      doctorSpeciality,
      transport,
      fuel,
      patientCep,
      establishment,
      establishmentCep,
      reason,
      type,
      patientGenre,
    });

    return res.status(201).json(appointment);
  }
}
