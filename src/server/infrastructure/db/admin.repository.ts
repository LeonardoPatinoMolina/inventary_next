import { Admin } from "@/server/domain/entities/admin.entity";
import { IAdminRepository } from "@/server/domain/repositories/admin.repository";
import { ConnectionDB } from "./connection";
import { AdminException } from "@/server/domain/exceptions/exceptions";
import { AdminDTO } from "@/server/application/dto/admin.dto";

export class AdminRepository implements IAdminRepository {
  private connection: ConnectionDB = new ConnectionDB();

  /**
   * Método encargado de consultar un registro en el repositorio admin
   * @param id clabe única que identifica al Admin que se solicita
   */
  async findOne(id: number): Promise<Admin> {
    try {
      const connect = await this.connection.on();
      const [rows]: any[] = await connect.execute(
        "SELECT * FROM `tbladministrador` WHERE `adm_id` = ?",
        [id]
      );
      this.connection.off();

      if (rows.length <= 0) {
        throw new Error(AdminException.NOT_FOUND);
      }
      //retornamos una instancia de la clase admin
      return new Admin({
        id: rows[0].adm_Id,
        nombre: rows[0].adm_Nombre,
        password: rows[0].adm_Password,
      });
    } catch (error) {
      this.connection.off();
      throw new Error(AdminException.FIND_ERROR);
    }
  } //end findOne

  /**
   * Método encargado de consultar todos los registros de administrador
   * en existenia en la base de datos
   */
  async findAll(): Promise<Admin[]> {
    try {
      const connect = await this.connection.on();
      const [rows]: any[] = await connect.execute(
        "SELECT * FROM `tbladministrador`"
      );
      this.connection.off();

      if (rows.length < 0) {
        throw new Error(AdminException.NOT_FOUND);
      }
      //mapeamos los resultados para convertirlos en un arreglo de la clase Admin
      const adminArray = rows.map((row: any) => {
        return new Admin({
          nombre: row.adm_Nombre,
          id: row.adm_Id,
          password: row.adm_Password,
        });
      }); //end map
      return adminArray;
    } catch (error) {
      this.connection.off();
      throw new Error(AdminException.FIND_ERROR);
    }
  } //end findAll

  /**
   * Método encargado de editar o modificar un registro de 
   * administrador en la base de datos
   */
  async edit(id: number, data: AdminDTO): Promise<void> {
    try {
      const connect = await this.connection.on();
      //validamos si existen datos nuevos en los campos que se desean actualizar/editar
      if (data?.nombre && data?.password) {
        const [rows]: any[] = await connect.execute(
          "UPDATE `tbladministrador` SET `adm_Nombre` = ?, `adm_Password` = ? WHERE adm_Id = ? ",
          [data?.nombre, data?.password, id]
        );
      } else {
        if (data?.nombre) {
          const [rows]: any[] = await connect.execute(
            "UPDATE `tbladministrador` SET `adm_Nombre` = ? WHERE adm_Id = ? ",
            [data?.nombre, id]
          );
        }
        if (data?.password) {
          const [rows]: any[] = await connect.execute(
            "UPDATE `tbladministrador` SET `adm_Password` = ? WHERE adm_Id = ? ",
            [data?.password, id]
          );
        }
      }
    } catch (error) {
      throw new Error(AdminException.EDIT_ERROR);
    }
  }//end edit}

  insertOne(item: AdminDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
