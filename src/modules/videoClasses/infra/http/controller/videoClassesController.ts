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
      price,
      introVideo,
    } = req.body;

    const createUser = container.resolve(CreateVideoClassesService);

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
}
