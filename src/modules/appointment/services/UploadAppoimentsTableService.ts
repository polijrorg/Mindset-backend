/* eslint-disable no-await-in-loop */
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
      let record = await parser.read();
      record = await parser.read();
      record = await parser.read();
      record = await parser.read();
      const createAppointment = container.resolve(CreateAppointmentService);

      while (record) {
        const data = await makeAppointment(record);

        try {
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
