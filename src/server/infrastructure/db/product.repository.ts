import { ProductDTO } from "@/server/domain/dto/product.dto";
import { Product } from "@/server/domain/entities/product.entity";
import { ProductException } from "@/server/domain/exceptions/exceptions";
import { IProductRepository } from "@/server/domain/repositories/product.repository";
import { ConnectionDB } from "./connection";

export class ProductRepository implements IProductRepository {
  private readonly connection: ConnectionDB = new ConnectionDB();

  /**
   * Método encargado de consultar un registro en el repositorio product
   * @param id clabe única que identifica al Product que se solicita
   */
  async findOne(id: number): Promise<Product> {
    try {
      const connect = await this.connection.on();
      const q = `
      SELECT 
      pro_Codigo, 
      pro_Talla, 
      pro_Sexo, 
      pro_Ubicacion, 
      pro_Cantidad, 
      pro_ValorUnitario, 
      pro_ValorTotal, 
      pre_Nombre, 
      col_Color, 
      est_Estado,
      tblColor_col_Id,
      tblPrenda_pre_Id,
      tblEstado_est_Id
      FROM tblProductos 
      JOIN tblColor 
      ON tblProductos.tblColor_col_Id = tblColor.col_Id 
      JOIN tblPrenda 
      ON tblProductos.tblPrenda_pre_Id = tblPrenda.pre_Id 
      JOIN tblEstado 
      ON tblProductos.tblEstado_est_Id = tblEstado.est_Id
      WHERE tblProductos.tblEstado_est_Id != 2 
      AND pro_Codigo = ? 
      `;
      
      const [rows]: any[] = await connect.execute(q, [id]);
      this.connection.off();

      if (rows.length <= 0) {
        throw new Error(ProductException.NOT_FOUND);
      }
      //retornamos una instancia de la clase product
      return new Product({
        codigo: rows[0].pro_Codigo,
        cantidad: rows[0].pro_Cantidad,
        colorId: rows[0].tblColor_col_Id,
        color: rows[0].col_Color,
        prendaId: rows[0].tblPrenda_pre_Id,
        prenda: rows[0].pre_Nombre,
        sexo: rows[0].pro_Sexo,
        status: rows[0].tblEstado_est_Id,
        talla: rows[0].pro_Talla,
        ubicacion: rows[0].pro_Ubicacion,
        valorUnitario: rows[0].pro_ValorUnitario
      });
    } catch (error) {
      this.connection.off();
      throw new Error(ProductException.FIND_ERROR);
    }
  }//end find 

  /**
   * Método encargado de consultar todos los registros de prodctos
   * en existenia en la base de datos
   */
  async findAll(page?: number): Promise<{pages: number, data: Product[]}> {
    try {
      const connect = await this.connection.on();
      const q = `
      SELECT 
      (SELECT COUNT(*) FROM tblProductos) AS pro_total,
      pro_Codigo, 
      pro_Talla, 
      pro_Sexo, 
      pro_Ubicacion, 
      pro_Cantidad, 
      pro_ValorUnitario, 
      pro_ValorTotal, 
      pre_Nombre, 
      col_Color, 
      est_Estado,
      tblColor_col_Id,
      tblPrenda_pre_Id,
      tblEstado_est_Id
      FROM tblProductos 
      JOIN tblColor 
      ON tblProductos.tblColor_col_Id = tblColor.col_Id 
      JOIN tblPrenda 
      ON tblProductos.tblPrenda_pre_Id = tblPrenda.pre_Id 
      JOIN tblEstado 
      ON tblProductos.tblEstado_est_Id = tblEstado.est_Id
      WHERE tblProductos.tblEstado_est_Id != 2 
      ORDER BY pro_Codigo DESC
      LIMIT ${(page! * 20) - 20}, ${page! * 20}`;

      const [rows]: any[] = await connect.execute(q);
      this.connection.off();

      if (rows.length <= 0) {
        throw new Error(ProductException.NOT_FOUND);
      }

      //mapeamos los resultados para convertirlos en un arreglo de la clase Admin
      const prodArray = rows.map((row: any) => {
        return new Product({
          codigo: row.pro_Codigo,
          cantidad: row.pro_Cantidad,
          colorId: row.tblColor_col_Id,
          color: row.col_Color,
          prendaId: row.tblPrenda_pre_Id,
          prenda: row.pre_Nombre,
          sexo: row.pro_Sexo,
          status: row.tblEstado_est_Id,
          talla: row.pro_Talla,
          ubicacion: row.pro_Ubicacion,
          valorUnitario: row.pro_ValorUnitario
        });
      }); //end map
      return {pages: Math.ceil(rows[0].pro_total / 20),data: prodArray};
    } catch (error) {
      this.connection.off();
      throw new Error(ProductException.FIND_ERROR);
    }
  }//end findAll

  /**
   * @param id identificador del producto objetivo de  edición
   * @param data datos nuevos destinados a modificar el registro del producto
   * en base de datos que se estipule
   */
  async edit(id: number, data: ProductDTO): Promise<void>{
    try {      
      const connect = await this.connection.on();
      let query: string;
      //si la cantidad y el valor unitario son datos a editar/modificar entonces
      //tincluirlos en la query calculando el valor total
      if(!!data?.cantidad && !!data.valorUnitario){
        query = `
        UPDATE tblProductos 
        SET tblPrenda_pre_Id = ? 
        ${!!data?.prendaId ? `tblPrenda_pre_Id = ${data?.prendaId}` : ''}
        ${!!data?.ubicacion ? `pro_Ubicacion = '${data?.ubicacion}'` : ''}
        ${!!data?.colorId ? `tblColor_col_Id = ${data?.colorId}` : ''}
        ${!!data?.sexo ? `pro_Sexo = '${data?.sexo}'` : ''}
        ${!!data?.talla ? `pro_Talla = ${data?.talla}` : ''}
        ${!!data?.status ? `tblEstado_est_Id = ${data?.status}` : ''}
        pro_ValorUnitario = ${data.valorUnitario}
        pro_Cantidad = ${data.cantidad}
        pro_ValorTotal = ${data.cantidad * data.valorUnitario}
        WHERE pro_Codigo = ?
        LIMIT 0, 20
        `;
      }
      //si solo el valor unitario es un dato dato a editar/modificar, incluirlo en la query
      //y calcular el valor total basándonos en la cantidad actual
      else if(!!data.valorUnitario){
        const currentProd = await this.findOne(id);

        query = `
        UPDATE tblProductos 
        ${!!data?.prendaId ? `tblPrenda_pre_Id = ${data?.prendaId}` : ''}
        ${!!data?.ubicacion ? `pro_Ubicacion = '${data?.ubicacion}'` : ''}
        ${!!data?.colorId ? `tblColor_col_Id = ${data?.colorId}` : ''}
        ${!!data?.sexo ? `pro_Sexo = '${data?.sexo}'` : ''}
        ${!!data?.talla ? `pro_Talla = ${data?.talla}` : ''}
        ${!!data?.status ? `tblEstado_est_Id = ${data?.status}` : ''}
        pro_ValorUnitario = ${data.valorUnitario}
        pro_ValorTotal = ${currentProd.getCantidad() * data.valorUnitario}
        WHERE pro_Codigo = ?
        `;
      }
      //si solo la cantidad es un dato a editar/modificar, uncluirlo en la query
      //calculando el valor total basándonos en el valor únitario actual
      else if(!!data?.cantidad){
        const currentProd = await this.findOne(id);

        query = `
        UPDATE tblProductos 
        ${!!data?.prendaId ? `tblPrenda_pre_Id = ${data?.prendaId}` : ''}
        ${!!data?.ubicacion ? `pro_Ubicacion = '${data?.ubicacion}'` : ''}
        ${!!data?.colorId ? `tblColor_col_Id = ${data?.colorId}` : ''}
        ${!!data?.sexo ? `pro_Sexo = '${data?.sexo}'` : ''}
        ${!!data?.talla ? `pro_Talla = ${data?.talla}` : ''}
        ${!!data?.status ? `tblEstado_est_Id = ${data?.status}` : ''}
        pro_Cantidad = ${data.cantidad}
        pro_ValorTotal = ${data.cantidad * currentProd.getValorUnitario()}
        WHERE pro_Codigo = ?
        `;
      }//end if else
      else{//query si la cantidad y el valor unitario no son objeto a editar
        query = `
        UPDATE tblProductos 
        ${!!data?.prendaId ? `tblPrenda_pre_Id = ${data?.prendaId}` : ''}
        ${!!data?.ubicacion ? `pro_Ubicacion = '${data?.ubicacion}'` : ''}
        ${!!data?.colorId ? `tblColor_col_Id = ${data?.colorId}` : ''}
        ${!!data?.sexo ? `pro_Sexo = '${data?.sexo}'` : ''}
        ${!!data?.talla ? `pro_Talla = ${data?.talla}` : ''}
        ${!!data?.status ? `tblEstado_est_Id = ${data?.status}` : ''}
        WHERE pro_Codigo = ?
        `;
      }

      const [rows] = await connect.execute(query,[id]);
      this.connection.off();
    } catch (error) {
      this.connection.off();
      throw new Error(ProductException.EDIT_ERROR);
    }
    throw new Error("Method not implemented.");
  }//end edit
  
  /**
   * Método encrgado de registrar un nuevo producto en el repositorio de productos
   * @param item datos del producto próximo a ser registrado
   */
  async insertOne(item: ProductDTO): Promise<void> {
    try {
      const connect = await this.connection.on()
      const query = `
      INSERT INTO tblProductos (
        pro_Codigo, 
        pro_Talla,
        pro_Sexo, 
        pro_Ubicacion, 
        pro_Cantidad, 
        pro_ValorUnitario, 
        pro_ValorTotal, 
        tblColor_col_Id, 
        tblPrenda_pre_Id, 
        tblEstado_est_Id) 
        VALUES (
          ${item.codigo}
          ${item.talla}, 
          '${item.sexo}', 
          '${item.ubicacion}', 
          ${item.cantidad}, 
          ${item.valorUnitario}, 
          ${item.cantidad! * item.valorUnitario!}, 
          ${item.colorId}, 
          ${item.prendaId}, 
          1
        )
      `
      const [rows] = await connect.execute(query);
      this.connection.off();
    } catch (error) {
      this.connection.off()
      throw new Error(ProductException.INSERT_ERROR);
    }
  }//end insertOne

  /**
   * Método encargado de remover uyn regsitro de producto del
   *  repositorio de productos
   * @param id identificador del roducto próximo a remover
   */
  async remove(id: number): Promise<void> {
    try {
      const connect = await this.connection.on();
      const query = `
      UPDATE tblProductos SET tblEstado_est_Id = 2 WHERE pro_Codigo = ?
      `;
      const [rows] = await connect.execute(query,id);
      this.connection.off()
    } catch (error) {
      this.connection.off();
      throw new Error(ProductException.DELETE_ERROR);
    }
  }
//end remove
}