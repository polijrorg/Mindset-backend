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
const makeAppointment = (record: string[]): IRequest => {
  const data = {

    patientId: record[0],
    companyId: record[14],
    doctorId: record[5],
    doctorSpeciality: record[6],
    establishmentCode: parseInt(record[9], 10),
    fuel: record[13],
    patientCep: record[1],
    patientSex: record[2],
    reason: record[7],
    transport: record[12],
    type: record[8],
  } as IRequest;

  return data;
};

export default makeAppointment;
