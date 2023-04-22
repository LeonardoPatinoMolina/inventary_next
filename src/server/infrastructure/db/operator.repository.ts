import { OperatorDTO } from "@/server/domain/dto/operator.dto";
import { Operator } from "@/server/domain/entities/operator.entity";
import { OperatorException } from "@/server/domain/exceptions/exceptions";
import { IOperatorRepository } from "@/server/domain/repositories/operator.repository";
import { ConnectionDB } from "./connection";

export class OperatorRepository implements IOperatorRepository{
  private readonly connection: ConnectionDB = new ConnectionDB();

  /** 
   * Método encargado de consultar un registro del repositorio 
   * de operadores que se estipule
   * @param id identificador de operador a consultar
   */
  async findOne(id: number): Promise<Operator> {
    try {
      const connect = await this.connection.on();
      const query = `
        SELECT 
        ope_Id, 
        ope_Cedula, 
        ope_Nombre, 
        ope_Apellido, 
        ope_Credencial, 
        ope_Password,
        FROM tblOperadores WHERE tblEstado_est_Id != 2 
        AND ope_Id = ?
        ORDER BY ope_Cedula DESC
      `;
      const [rows]: any[] = await connect.execute(query,[id]);     
      this.connection.off();

      if (rows.length <= 0) {
        throw new Error(OperatorException.NOT_FOUND);
      }
      //retornamos una instancia de la clase operator
      return new Operator({
        id,
        apellido: rows[0].ope_Apellido,
        nombre: rows[0].ope_Nombre,
        cedula: rows[0].ope_Cedula,
        credential: rows[0].ope_Credencial,
        password: rows[0].ope_Password,
      });

    } catch (error) {
      this.connection.off();
      throw new Error(OperatorException.FIND_ERROR);
    }
  }//end findOne

  /**
   * Método necargado de consultar todos los registros del repositorio
   * de operadores
   */
  async findAll(): Promise<Operator[]> {
    try {
      const connect = await this.connection.on();
      const query = `
        SELECT 
        ope_Id, 
        ope_Cedula, 
        ope_Nombre, 
        ope_Apellido, 
        ope_Credencial, 
        ope_Password,
        FROM tblOperadores WHERE tblEstado_est_Id != 2 
        ORDER BY ope_Cedula DESC
      `;
      const [rows]: any[] = await connect.execute(query);     
      this.connection.off();

      if (rows.length <= 0) {
        throw new Error(OperatorException.NOT_FOUND);
      }
      //mapeamos los resultados para convertirlos en un arreglo de la clase Operator
      const operatorArray = rows.map((row: any)=>(
        new Operator({
          id: row.ope_Id,
          apellido: row.ope_Apellido,
          nombre: row.ope_Nombre,
          cedula: row.ope_Cedula,
          credential: row.ope_Credencial,
          password: row.ope_Password,
        })
      ));
      return operatorArray;
    } catch (error) {
      throw new Error(OperatorException.FIND_ERROR);
    }
  }

  /**
   * Método encargado de remover un registro de operador en
   *  el repositorio de operadores
   * @param id identificador de operador próximo a editar
   * @param data datos nuevos destinados a modificar el registro 
   * del operador que se estipule en el repositorio
   */
  async edit(id: number, data: OperatorDTO): Promise<void> {
    try {
      const connect = await this.connection.on();
      const query = `
      UPDATE tblOperadores 
      SET 
      ${!!data?.cedula ? `ope_Cedula= ${data.cedula}`: ''}
      ${!!data?.credential ? `ope_Credencial= ${data.credential}`: ''}
      ${!!data?.nombre ? `ope_Nombre= ${data.nombre}`: ''}
      ${!!data?.apellido ? `ope_Apellido= ${data.apellido}`: ''}
      WHERE ope_Id = ?
      `;
      
      const [rows] = await connect.execute(query,[id]);

      this.connection.off();
    } catch (error) {
      this.connection.off();
      throw new Error(OperatorException.EDIT_ERROR);
    }
  }//end edit

  /**
   * Método encargado de registras nuevo operador en 
   * repositorio de operadores
   * @param item datos de operador próximo a registrar
   */
  async insertOne(item: OperatorDTO): Promise<void> {
    try {
      const connect = await this.connection.on();
      const query = `
      INSERT INTO
       tblOperadores (
        ope_Cedula, 
        ope_Nombre, 
        ope_Apellido, 
        ope_Credencial, 
        ope_Password, 
        tblEstado_est_Id
      ) VALUES (
        ${item.cedula}, 
        '${item.nombre}', 
        '${item.apellido}', 
        '${item.credential}', 
        '${item.password}', 
        1)
      `;
      const [rows] = await connect.query(query);
      this.connection.off();
    
    } catch (error) {
      this.connection.off();
      throw new Error(OperatorException.INSERT_ERROR); 
    }
  }//end insertOne

  /**
   * Método encargado de remover registro de operador de repositorio 
   * de operadores
   * @param id identificador de operador próximo a remover
   */
  async remove(id: number): Promise<void> {
    try {
      const connect = await this.connection.on();
      const query = `
      UPDATE tblOperadores 
      SET tblestado_est_Id = 2 
      WHERE ope_Id = ?
      `;
      const [rows] = await connect.execute(query,[id]);
      this.connection.off();
    } catch (error) {
      this.connection.off();
      throw new Error(OperatorException.DELETE_ERROR); 
    }
  }//end remove

}