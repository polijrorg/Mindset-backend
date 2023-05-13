import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name, email, password,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name, email, password,
    });

    return res.status(201).json(user);
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const {
      id,
    } = req.params;

    const deleteUser = container.resolve(DeleteUserService);

    const user = await deleteUser.execute({
      id,
    });

    return res.status(201).json(user);
  }
}
