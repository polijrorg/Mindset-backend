import { Request, Response } from 'express';
// import { container } from 'tsyringe';

export default class EstablishmentController {
  public async upload(req: Request, res: Response): Promise<Response> {
    return res.status(201);
  }
}
