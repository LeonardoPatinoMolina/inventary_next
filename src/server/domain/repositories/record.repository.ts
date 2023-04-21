import { RecordDTO } from "@/server/application/dto/record.dto";
import { Repository } from "../common/repository.interface";
import { Record } from "../entities/records.entity";

export interface IRecordRepository extends Repository<Record, RecordDTO> {
  
}