import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import 'express-async-errors';

import '@shared/container';

import AppError from '@shared/errors/AppError';

import validatorErrorHandler from '@shared/infra/http/middleware/validatorErrorHandler';

import swaggerDocs from '@config/swagger';

import routes from './routes';

const app = express();

app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

app.use(routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // return response.status(500).json({
  //   status: 'error',
  //   message: 'Internal Server Error',
  // });

  return response.status(500).json({
    status: 'error',
    message: err.message,
  });
});

app.use(validatorErrorHandler);

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server started on port ${process.env.PORT || 3333}`);
});
