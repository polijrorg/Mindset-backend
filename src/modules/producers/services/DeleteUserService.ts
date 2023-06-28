// import { inject, injectable } from 'tsyringe';

// import { Producer } from '@prisma/client';
// import IProducersRepository from '../repositories/IProducersRepository';

// // import AppError from '@shared/errors/AppError';

// interface IRequest {
//   id
//   :string;
// }

// @injectable()
// export default class DeleteProducerService {
//   constructor(
//     @inject('ProducerRepository')
//     private producersRepository: IProducersRepository,

//   ) { }

//   public async execute({ id }: IRequest): Promise<Producer> {
//     const producer = await this.producersRepository.delete(id);
//     return producer;
//   }
// }
