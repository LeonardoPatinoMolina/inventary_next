import { AdminDTO } from "@/server/application/dto/admin.dto";
import { Repository } from "../common/repository.interface";
import { Admin } from "../entities/admin.entity";

export interface IAdminRepository extends Repository<Admin, AdminDTO>{
  
}