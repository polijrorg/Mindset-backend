interface ICreateAppointmentDTO {
  patientId: string;
  doctorId: string;
  doctorSpeciality: string;
  transport: string;
  fuel: string;
  state: string;
  generatedCC: number;
  distance: number;
  companyId: string;
  CO2: number;
  location: string;
  type: string;
  reason: string;
  establishment: string;
  patientCep: string;
  city: string;
  patientGenre: string;
}

export default ICreateAppointmentDTO;
