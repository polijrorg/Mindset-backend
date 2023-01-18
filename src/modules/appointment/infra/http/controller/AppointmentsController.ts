import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetCardsService from '@modules/appointment/services/GetCardsService';
import ListAppointmentTableService from '@modules/appointment/services/ListAppointmentTableService';
import GetSexDataService from '@modules/appointment/services/GetSexDataService';
import CreateAppointmentService from '@modules/appointment/services/CreateAppointmentService';
import GetSpecialityDataService from '@modules/appointment/services/GetSpecialityDataService';
import GetCarbonPerTimeDataService from '@modules/appointment/services/GetCarbonPerTimeDataService';
import UploadAppoimentsTableService from '@modules/appointment/services/UploadAppoimentsTableService';
import AppError from '@shared/errors/AppError';

export default class AppointmestsController {
  public async getCards(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getCards = container.resolve(GetCardsService);

    const cards = await getCards.execute({ id });

    return res.status(200).json(cards);
  }

  public async getTable(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getTable = container.resolve(ListAppointmentTableService);

    const table = await getTable.execute({ id });

    return res.status(200).json(table);
  }

  public async getSexData(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getSexData = container.resolve(GetSexDataService);

    const sexData = await getSexData.execute({ id });

    return res.status(200).json(sexData);
  }

  public async getSpecialityData(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getSpecialityData = container.resolve(GetSpecialityDataService);

    const specialityData = await getSpecialityData.execute({ id });

    return res.status(200).json(specialityData);
  }

  public async getCarbonPerTimeData(req: Request, res: Response): Promise<Response> {
    const { year } = req.params;
    const { id } = req.user;
    let parsedYear = 0;
    if (year) parsedYear = parseInt(year, 10);

    const getCarbonPerTimeData = container.resolve(GetCarbonPerTimeDataService);
    const carbonPerTime = await getCarbonPerTimeData.execute({ id, year: parsedYear });

    return res.json(carbonPerTime);
  }

  public async createAppointment(req: Request, res: Response): Promise<Response> {
    const {
      patientId,
      doctorId,
      companyId,
      doctorSpeciality,
      transport,
      fuel,
      patientCep,
      establishmentCode,
      reason,
      type,
      patientSex,
    } = req.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      patientId,
      doctorId,
      companyId,
      doctorSpeciality,
      transport,
      fuel,
      patientCep,
      establishmentCode,
      reason,
      type,
      patientSex,
    });

    return res.status(201).json(appointment);
  }

  public async uploadAppointmentsTable(req:Request, res:Response):Promise<Response> {
    const file = req?.file;
    if (!file) {
      throw new AppError('file not found', 400);
    }

    const uploadTable = container.resolve(UploadAppoimentsTableService);
    await uploadTable.execute(file.filename);

    return res.status(201).send('Upload Completed');
  }
}
