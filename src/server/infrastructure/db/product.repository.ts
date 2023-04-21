import { ProductDTO } from "@/server/application/dto/product.dto";
import { Product } from "@/server/domain/entities/product.entity";
import { IProductRepository } from "@/server/domain/repositories/product.repository";
import { ConnectionDB } from "./connection";
import { ProductException } from "@/server/domain/exceptions/exceptions";

export class ProductRepository implements IProductRepository {
  private connection: ConnectionDB = new ConnectionDB();

  /**
   * Método encargado de consultar un registro en el repositorio product
   * @param id clabe única que identifica al Product que se solicita
   */
  async findOne(id: number): Promise<Product> {
    try {
      const connect = await this.connection.on();
      const [rows]: any[] = await connect.execute(
        "SELECT pro_Codigo, pro_Talla, pro_Sexo, pro_Ubicacion, pro_Cantidad, pro_ValorUnitario, pro_ValorTotal, col_Color, col_Id, pre_Nombre, pre_Id, est_Estado FROM tblProductos JOIN tblColor JOIN tblPrenda JOIN tblEstado WHERE tblProductos.tblColor_col_Id = tblColor.col_Id AND tblProductos.tblPrenda_pre_Id = tblPrenda.pre_Id AND tblProductos.tblEstado_est_Id = tblEstado.est_Id AND tblProductos.tblEstado_est_Id != 2 AND pro_Codigo = ?",
        [id]
      );
      this.connection.off();

      if (rows.length <= 0) {
        throw new Error(ProductException.NOT_FOUND);
      }
      //retornamos una instancia de la clase product
      return new Product({
        codigo: rows[0].pro_Codigo,
        cantidad: rows[0].pro_Cantidad,
        color: rows[0].col_Color,
        prenda: rows[0].pre_Nombre,
        sexo: rows[0].pro_Sexo,
        status: rows[0].est_Estado,
        talla: rows[0].pro_Talla,
        ubicacion: rows[0].pro_Ubicacion,
        valorUnitario: rows[0].pro_ValorUnitario
      });
    } catch (error) {
      this.connection.off();
      throw new Error(ProductException.EDIT_ERROR);
    }
  }
  async findAll(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  async edit(id: number, data: ProductDTO): Promise<void>{
    throw new Error("Method not implemented.");
  }
  async insertOne(item: Product): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async remove(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

}