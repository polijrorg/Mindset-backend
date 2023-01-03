import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UploadCNESTableService from '@modules/establishment/services/UploadCNESTableService';

export default class EstablishmentController {
  public async upload(req: Request, res: Response): Promise<Response> {
    const uploadCNESTable = container.resolve(UploadCNESTableService);
    await uploadCNESTable.execute();

    return res.status(201);
  }
}
