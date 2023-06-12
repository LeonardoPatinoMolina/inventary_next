import { Operator } from "@/server/domain/entities/operator.entity";
import { IOperatorRepository } from "@/server/domain/repositories/operator.repository";
import { OperatorDTO } from "../../domain/dto/operator.dto";

export class MockeDBOperator implements IOperatorRepository{
  findOne(id: number): Promise<Operator> {
    throw new Error("Method not implemented.");
  }
  findAll(page: number): Promise<{ pages: number; data: Operator[]; total: number; }> {
    const operators = Array.from({length: 10}).map((_,i)=>({
      apellido: 'Guzmán',cedula: 10028927, credential: '2873423',id: i+12,nombre: 'Rodrigo',password: 'jajai'
    }))

    return {pages: 1, data: operators, total: operators.length} as any;
  }
  
  edit(id: number, data: OperatorDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  insertOne(item: OperatorDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  

}