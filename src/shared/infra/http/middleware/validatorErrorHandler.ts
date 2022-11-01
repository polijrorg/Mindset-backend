import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import AppError from '@shared/errors/AppError';

export default function validatorErrorHandler(
  request: Request,
  resonse: Response,
  next: NextFunction,
): void {
  const validatorErrors = validationResult(request);
  console.log(validatorErrors);

  if (!validatorErrors.isEmpty()) throw new AppError(validatorErrors.array()[0].msg, 400);

  return next();
}
