import { container, inject, injectable } from 'tsyringe';
import { parse } from 'csv-parse';
import fs from 'fs';
import path from 'path';
import multerConfigAppointments from '@config/multerConfigAppointments';

import makeAppointment from '../factory/AppointmentFactory';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

@injectable()
export default class UploadApointmentsTableService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute(filename:string): Promise<void> {
    const parser = parse({
      delimiter: ';',
    });

    parser.on('readable', async () => {
      let record = parser.read();
      record = parser.read();

      const createAppointment = container.resolve(CreateAppointmentService);

      while (record) {
        const data = makeAppointment(record);

        try {
          // eslint-disable-next-line no-await-in-loop
          await createAppointment.execute(data);
        } catch (e) { console.log((e as Error).message); }

        record = parser.read();
      }
    });

    const originalPath = path.resolve(multerConfigAppointments.directory, filename);
    const table = await fs.promises.readFile(originalPath);

    const str = table?.toString('utf8');
    parser.write(str);

    await fs.promises.unlink(originalPath);
  }
}
