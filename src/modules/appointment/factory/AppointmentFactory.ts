import FindRandomEstablishmentService from '@modules/establishment/services/FindRandomEstablishmentService';
import { container } from 'tsyringe';

interface IRequest {
  patientId: string;
  doctorId: string;
  doctorSpeciality: string;
  transport: string;
  fuel: string;
  patientCep: string;
  establishmentCode: number;
  reason: string;
  type: string;
  patientSex: string;
  companyId: string;
}

const makeAppointment = async (record: string[]): Promise<IRequest> => {
  const findRandomEstablishment = await container.resolve(FindRandomEstablishmentService);

  const establishmentCnesCode = await findRandomEstablishment.execute();
  const data = {

    patientId: record[0],
    companyId: record[13],
    doctorId: record[4],
    doctorSpeciality: record[5],
    establishmentCode: 0,
    fuel: record[12],
    patientCep: record[1],
    patientSex: 'male',
    reason: record[6],
    transport: record[11],
    type: record[7],
  } as IRequest;
  data.establishmentCode = establishmentCnesCode;
  return data;
};

export default makeAppointment;
