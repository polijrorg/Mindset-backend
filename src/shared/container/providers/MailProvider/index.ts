import { container } from 'tsyringe';

import SESMailProvider from './implementations/SESMailProvider';
import IMailProvider from './models/IMailProvider';

container.registerInstance<IMailProvider>('MailProvider', container.resolve(SESMailProvider));
