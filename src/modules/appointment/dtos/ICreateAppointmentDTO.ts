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
}

export default ICreateAppointmentDTO;
