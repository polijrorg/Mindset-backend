import CreateProducerService from '@modules/producers/services/CreateProducerService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProducersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      cpf,
      birthdayDate,
      course,
      rgNumber,

    } = req.body;
    const photos = req.files;
    let rgFront = null;
    let rgBack = null;
    let curriculum = null;

    const createProducer = container.resolve(CreateProducerService);
    photos?.forEach((element:Express.Multer.File) => {
      if (element.fieldname === 'rgFront') { rgFront = element.location; } else if (element.fieldname === 'rgBack') { rgBack = element.location; } else { curriculum = element.location; }
    });
    if (rgBack === null || rgFront === null || curriculum === null) throw new AppError('Document not found');
    const producer = await createProducer.execute({
      name,
      cpf,
      birthdayDate,
      course,
      rgFront,
      rgBack,
      rgNumber,
      curriculum,
    });

    return res.status(201).json(producer);
  }
}
