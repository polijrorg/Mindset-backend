import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetCardsService from '@modules/appointment/services/GetCardsService';
import ListAppointmentTableService from '@modules/appointment/services/ListAppointmentTableService';
import GetGenreDataService from '@modules/appointment/services/GetGenreDataService';

export default class AppointmestsController {
  public async getCards(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getCards = container.resolve(GetCardsService);

    const cards = await getCards.execute({ id });

    return res.status(201).json(cards);
  }

  public async getTable(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getTable = container.resolve(ListAppointmentTableService);

    const table = await getTable.execute({ id });

    return res.status(201).json(table);
  }

  public async getGenreData(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getGenreData = container.resolve(GetGenreDataService);

    const genreData = await getGenreData.execute({ id });

    return res.status(201).json(genreData);
  }
}
