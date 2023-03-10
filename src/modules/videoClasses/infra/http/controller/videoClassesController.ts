import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateVideoClassesService from '@modules/courses/services/CreateCourseService';

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
}
