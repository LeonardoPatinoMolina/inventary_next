import { RecordDTO } from "../../domain/dto/record.dto";
import { Record } from "../../domain/entities/records.entity";
import { IRecordRepository } from "../../domain/repositories/record.repository";

export class MockeDBRecord implements IRecordRepository{
  findOne(id: number): Promise<Record> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<{pages: number, data: Record[], total: number}> {
    return {
      pages: 1,
      total: 20,
      data: Array.from({length: 20}).map((el, indx)=>{
        return new Record({
          fecha: '2023-06-12',
          hora: '09:30',
          id: (100002+indx),
          operacionId: 1,
          operacion: 'Registro',
          operadorCedula: 12120909,
          operadorNombre: 'Roberto',
          operatorId: 12,
          productId: 1234
        } as any)})
  }
}

  async findBy(filter: string, query: string,page: number): Promise<{totalPages: number, data: any, total: number}>{
    return {
      totalPages: 1,
      total: 20,
      data: Array.from({length: 20}).map((el, indx)=>{
        return new Record({
          fecha: new Date('2023-06-12'),
          hora: new Date('09:30'),
          id: 12,
          operacionId: 1,
          operacion: '',
          operadorCedula: 1212,
          operadorNombre: '',
          operatorId: 12,
          productId: 1234
        } as any);
      })
    }
// const epa: RecordDTO = {
//   fecha: new Date('2023-06-12'),
//   hora: new Date('09:30'),
//   id: 12,
//   operacionId: 1,
//   operatorId: 12,
//   productId: 1234
// }
  }
  
  edit(id: number, data: RecordDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  insertOne(item: RecordDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

}