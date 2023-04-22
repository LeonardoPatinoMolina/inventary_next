import { RecordDTO } from "@/server/domain/dto/record.dto";
import { Record } from "@/server/domain/entities/records.entity";
import { RecordException } from "@/server/domain/exceptions/exceptions";
import { IRecordRepository } from "@/server/domain/repositories/record.repository";
import { ConnectionDB } from "./connection";

export class RecordRepository implements IRecordRepository {
  private connection: ConnectionDB = new ConnectionDB();

  /**
   * Método encargado de consultar un registro en el repositorio product
   * @param id clabe única que identifica al Product que se solicita
   */
  async findOne(id: number): Promise<Record> {
    try {
      const connect = await this.connection.on();

      const query = `
        SELECT 
          reg_Id, 
          reg_Fecha, 
          reg_Hora, 
          pro_Codigo, 
          tblOperacion_opn_Id,
          tblOperadores_ope_Id,
          tblProductos_pro_Codigo
          FROM tblRegistros,
          WHERE 
          reg_Id = ?
          ORDER BY reg_Fecha DESC
      `
      const [rows]: any[] = await connect.execute(query,[id]);
      this.connection.off();

      if (rows.length <= 0) {
        throw new Error(RecordException.NOT_FOUND);
      }
      //retornamos una instancia de la clase record
      return new Record({
        fecha: rows[0].reg_fecha,
        hora: rows[0].reg_Hora,
        id,
        operacionId: rows[0].tblOperacion_opn_Id,
        operatorId: rows[0].tblOperadores_ope_Id,
        productId: rows[0].tblProductos_pro_Codigo
      });
    } catch (error) {
      this.connection.off();
      throw new Error(RecordException.FIND_ERROR);
    }
  }//end find 

  /**
   * Método encargado de consultar todos los registros de prodctos
   * en existenia en la base de datos
   */
  async findAll(): Promise<Record[]> {
    try {
      const connect = await this.connection.on();
      const query = `
        SELECT 
          reg_Id, 
          reg_Fecha, 
          reg_Hora, 
          pro_Codigo, 
          tblOperacion_opn_Id,
          tblOperadores_ope_Id,
          tblProductos_pro_Codigo
          FROM tblRegistros,
          WHERE 
          ORDER BY reg_Fecha DESC
      `
      const [rows]: any[] = await connect.execute(query);
      this.connection.off();

      if (rows.length <= 0) {
        throw new Error(RecordException.NOT_FOUND);
      }

      //mapeamos los resultados para convertirlos en un arreglo de la clase Admin
      const recordArray = rows.map((row: any) => {
        return new Record({
          fecha: row.reg_fecha,
          hora: row.reg_Hora,
          id: row.reg_Id,
          operacionId: row.tblOperacion_opn_Id,
          operatorId: row.tblOperadores_ope_Id,
          productId: row.tblProductos_pro_Codigo
        });
      }); //end map
      return recordArray;
    } catch (error) {
      this.connection.off();
      throw new Error(RecordException.FIND_ERROR);
    }
  }//end findAll

  async edit(id: number, data: RecordDTO): Promise<void>{
    throw new Error("Method not implemented.");
  }//end edit
  
  /**
   * Método encrgado de registrar un nuevo producto en el repositorio de productos
   * @param item datos del producto próximo a ser registrado
   */
  async insertOne(item: RecordDTO): Promise<void> {
    try {
      const connect = await this.connection.on()
      const query = `
      INSERT INTO tblRegistros (
        reg_Fecha, 
        reg_Hora,
        tblOperacion_opn_Id,
        tblProductos_pro_Codigo,
        tblOperadores_ope_Id
      ) VALUE (
        current_date(),
        current_time(),
        ${item.operacionId}, 
        ${item.productId},
        ${item.operatorId})
      `
      const [rows] = await connect.execute(query);
      this.connection.off();
    } catch (error) {
      this.connection.off()
      throw new Error(RecordException.INSERT_ERROR);
    }
  }//end insertOne

  async remove(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }//end remove
}