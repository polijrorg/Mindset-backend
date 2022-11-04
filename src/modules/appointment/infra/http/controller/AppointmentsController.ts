import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetCardsService from '@modules/appointment/services/GetCardsService';

export default class AppointmestsController {
  public async getCards(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getCards = container.resolve(GetCardsService);

    const cards = await getCards.execute({ id });

    return res.status(201).json(cards);
  }
}
