import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCourseService from '@modules/courses/services/CreateCourseService';
import listPopularService from '@modules/courses/services/listPopularService';

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
    } = req.body;

    const createUser = container.resolve(CreateCourseService);

    const user = await createUser.execute({
      name,
      numberOfVideos,
      createdBy,
      description,
      rating,
      avatar,
      userId,
    });

    return res.status(201).json(user);
  }

  public async listPopular(req:Request, res:Response):Promise<Response> {
    const listPopular = await container.resolve(listPopularService);
    const list = await listPopular.execute();
    return res.status(201).json(list);
  }
}
