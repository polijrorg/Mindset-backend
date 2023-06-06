import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCourseService from '@modules/courses/services/CreateCourseService';
import listPopularService from '@modules/courses/services/listPopularService';
import listByUserService from '@modules/courses/services/listByUserService';
import searchCoursesService from '@modules/courses/services/searchCoursesService';
import AppError from '@shared/errors/AppError';
import UploadUserService from '@modules/courses/services/UploadUserService';
import GetByIdService from '@modules/courses/services/GetByIdService';
import RateCourseByIdService from '@modules/courses/services/RateCourseByIdService';

export default class CourseController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      numberOfVideos,
      createdBy,
      description,
      rating,
      avatar,
      userId,
      introVideo,
      price,
    } = req.body;

    const createUser = await container.resolve(CreateCourseService);
    const user = await createUser.execute({
      name,
      numberOfVideos,
      createdBy,
      description,
      rating,
      avatar,
      userId,
      introVideo,
      price,
    });

    return res.status(201).json(user);
  }

  public async listPopular(req:Request, res:Response):Promise<Response> {
    const listPopular = await container.resolve(listPopularService);
    const list = await listPopular.execute();
    return res.status(201).json(list);
  }

  public async listById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const listbyid = container.resolve(listByUserService);

    const courses = await listbyid.execute(id);

    return res.status(201).json(courses);
  }

  public async rate(req: Request, res: Response): Promise<Response> {
    const { id, rate } = req.body;
    const rating = container.resolve(RateCourseByIdService);

    const course = await rating.execute(id, rate);

    return res.status(201).json(course);
  }

  public async searchCourses(req: Request, res: Response): Promise<Response> {
    const { data } = req.params;

    const search = container.resolve(searchCoursesService);

    const courses = await search.execute(data);

    return res.status(201).json(courses);
  }

  public async GetById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const courses = container.resolve(GetByIdService);

    const course = await courses.execute(id);

    return res.status(201).json(course);
  }

  public async upload(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const video = req.file;

    if (!video) {
      throw new AppError('file not found', 400);
    }
    const uploadUser = container.resolve(UploadUserService);

    const user = await uploadUser.execute({
      id,
      photoFile: video as Express.Multer.File,
    });

    return res.status(201).json(user);
  }
}
