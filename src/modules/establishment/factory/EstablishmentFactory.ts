import ICreateEstablishmentDTO from '@modules/establishment/dtos/ICreateEstablishmentDTO';

const makeEstablishment = (record: string[]): ICreateEstablishmentDTO => {
  const latitude = !Number.isNaN(parseInt((record[21]).replace('.', ''), 10))
    ? parseInt((record[21]).replace('.', ''), 10)
    : null;
  const longitude = !Number.isNaN(parseInt(record[22].replace('.', ''), 10))
    ? parseInt(record[22].replace('.', ''), 10)
    : null;

  const place = record[17] ?? '';
  const address = record[18] ?? 'S/N';
  const district = record[19] ?? '';

  const data = {
    cep: parseInt(record[16], 10),
    fantasyName: record[6],
    cnesCode: parseInt(record[0], 10),
    address,
    district,
    place,
    latitude,
    longitude,
  } as ICreateEstablishmentDTO;

  return data;
};

export default makeEstablishment;
