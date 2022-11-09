interface ICreateAppointmentDTO {
  patientId: string;
  doctorId: string;
  doctorSpeciality: string;
  transport: string;
  fuel: string;
  state: string;
  city: string;
  patientCep: string;
  establishment: string;
  establishmentCep: string;
  reason: string;
  type: string;
  patientGenre: string;
  generatedCC: number;
  CO2: number;
  distance: number;
  companyId: string;
}

export default ICreateAppointmentDTO;
