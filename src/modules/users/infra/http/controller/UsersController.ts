import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ForgotPasswordEmailService from '@modules/users/services/ForgotPasswordEmailService';
import ChangePasswordService from '@modules/users/services/ChangePasswordService';
import ChangeConfigsService from '@modules/users/services/ChangeConfigsService';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      password,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    user.password = '###';

    return res.status(201).json(user);
  }

  public async forgotPassword(req: Request, res: Response): Promise<Response> {
    const { email } = req.params;

    const forgotPasswordEmail = container.resolve(ForgotPasswordEmailService);

    await forgotPasswordEmail.execute({ email });

    return res.send('Email sent');
  }

  public async changePassword(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { password } = req.body;

    const changePassword = container.resolve(ChangePasswordService);

    await changePassword.execute({ id, password });

    return res.send('Password Changed');
  }

  public async changeConfigs(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { defaultFuel, defaultTransport, enableResoluteness } = req.body;

    const changeConfigs = container.resolve(ChangeConfigsService);

    const user = await changeConfigs.execute({
      id, defaultFuel, defaultTransport, enableResoluteness,
    });

    return res.json({
      defaultFuel: user.defaultFuel,
      defaultTransport: user.defaultTransport,
      enableResoluteness: user.enableResoluteness,
    });
  }
}
