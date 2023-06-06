import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateVideoClassesService from '@modules/courses/services/CreateCourseService';

export default class VideoClassesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      createdBy,
      numberOfClass,
      courseId,
      file,
      description,

    } = req.body;

    const createUser = container.resolve(CreateVideoClassesService);

    const user = await createUser.execute({
      name,
      createdBy,
      numberOfClass,
      courseId,
      file,
      description,

    });

    return res.status(201).json(user);
  }
}
