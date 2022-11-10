import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import path from 'path';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
export default class ForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Invalid email', 400);

    const code = sign({}, authConfig.jwt.forgotSecret, {
      expiresIn: authConfig.jwt.forgotExpiresIn,
      subject: user.id,
    });

    const template = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    await this.mailProvider.sendMail({
      to: {
        email,
        name: user.name,
      },
      subject: 'Password Recovery',
      templateData: {
        file: template,
        variables: {
          name: user.name, code,
        },
      },
    });
  }
}
