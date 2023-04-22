import { OperatorDTO } from "../dto/operator.dto";
import { Repository } from "../common/repository.interface";
import { Operator } from "../entities/operator.entity";

export interface IOperatorRepository extends Repository<Operator, OperatorDTO>{
  
}