import { inject, injectable } from 'tsyringe';
import { parse } from 'csv-parse';
import fs from 'fs';
import path from 'path';

import multerConfig from '@config/multerConfig';

import makeEstablishment from '../factory/EstablishmentFactory';

import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';

@injectable()
export default class UploadCNESTableService {
  constructor(
    @inject('EstablihsmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) { }

  public async execute(): Promise<void> {
    const parser = parse({
      delimiter: ';',
    });

    parser.on('readable', async () => {
      let record = parser.read();
      record = parser.read();

      await this.establishmentsRepository.deleteAll();

      const handleCreate = async () => {
        const data = makeEstablishment(record);

        await this.establishmentsRepository.create(data);

        record = parser.read();

        if (record) await handleCreate();
      };

      handleCreate();
    });

    const originalPath = path.resolve(multerConfig.directory, 'table.csv');
    const table = await fs.promises.readFile(originalPath);

    const str = table?.toString('utf8');
    parser.write(str);

    await fs.promises.unlink(originalPath);
  }
}
