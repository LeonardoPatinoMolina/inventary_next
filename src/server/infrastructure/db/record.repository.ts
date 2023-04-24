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
          tblProductos_pro_Codigo,
          ope_Nombre,
          ope_Cedula,
          opn_Operacion
          FROM tblRegistros
          JOIN tblOperacion
          ON tblRegistros.tblOperacion_opn_Id = tblOperacion.opn_Id
          JOIN tblOperador
          ON tblRegistros.tblOperadores_ope_Id = tblOperadores.ope_Id
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
        id,
        fecha: rows[0].reg_fecha,
        hora: rows[0].reg_Hora,
        operacionId: rows[0].tblOperacion_opn_Id,
        operacion: rows[0].opn_Operacion,
        operatorId: rows[0].tblOperadores_ope_Id,
        operadorCedula: rows[0].ope_Cedula,
        operadorNombre: rows[0].ope_Nombre,
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
  async findAll(page?: number): Promise<{pages: number, data: Record[]}> {
    try {
      const connect = await this.connection.on();
      const query = `
        SELECT 
          (SELECT COUNT(*) FROM tblProductos) AS reg_total,
          reg_Id, 
          reg_Fecha, 
          reg_Hora, 
          pro_Codigo, 
          tblOperacion_opn_Id,
          tblOperadores_ope_Id,
          tblProductos_pro_Codigo
          ope_Nombre,
          ope_Cedula,
          opn_Operacion
          FROM tblRegistros
          JOIN tblOperacion
          ON tblRegistros.tblOperacion_opn_Id = tblOperacion.opn_Id
          JOIN tblOperador
          ON tblRegistros.tblOperadores_ope_Id = tblOperadores.ope_Id
          ORDER BY reg_Fecha DESC
          LIMIT ${(page! * 20) - 20}, ${page! * 20}`;

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
          operacion: row.opn_Operacion,
          operatorId: row.tblOperadores_ope_Id,
          operadorCedula: row.ope_Cedula,
          operadorNombre: row.ope_Nombre,
          productId: row.tblProductos_pro_Codigo
        });
      }); //end map
      return {pages: Math.ceil(rows[0].reg_total / 20), data: recordArray};
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