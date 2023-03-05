import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import VerifyUserService from '@modules/users/services/VerifyUserService';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      phone,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      phone,
    });

    return res.status(201).json(user);
  }

  public async verifyCode(req: Request, res: Response): Promise<Response> {
    const {
      phone, code,
    } = req.body;

    const createUser = container.resolve(VerifyUserService);

    const user = await createUser.execute({
      phone, code,
    });

    return res.status(201).json(user);
  }
}
