import { Producer } from '@prisma/client';
import ICreateProducersDTO from '../dtos/ICreateProducersDTO';

interface IProducersRepository {

  create(data: ICreateProducersDTO): Promise<Producer>;
  // delete(id:string): Promise<Producer>;

}

export default IProducersRepository;
