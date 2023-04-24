import { ProductDTO } from "@/server/domain/dto/product.dto";
import { Product } from "@/server/domain/entities/product.entity";
import { IProductRepository } from "@/server/domain/repositories/product.repository";

export class MockeDB implements IProductRepository{
  findOne(id: number): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<Product[]> {
    return Array.from({length: 20}).map((el, indx)=>{
      return new Product({
        cantidad: 10,
        codigo:7272+indx,
        colorId: 2,
        color: 'rojo',
        prendaId: 2,
        prenda: 'camiseta',
        sexo: 'M',
        status: 1,
        talla: 12,
        ubicacion: '12-22-d',
        valorUnitario: 1000
      });
    })
  }

  async findBy(filter: string, query: string,page: number): Promise<{totalPages: number, data: any}>{
    return {
      totalPages: 1,
      data: Array.from({length: 20}).map((el, indx)=>{
        return new Product({
          cantidad: 10,
          codigo:7272+indx,
          colorId: 2,
          color: 'rojo',
          prendaId: 2,
          prenda: 'camiseta',
          sexo: 'M',
          status: 1,
          talla: 12,
          ubicacion: '12-22-d',
          valorUnitario: 1000
        });
      })
    }
  }
  
  edit(id: number, data: ProductDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  insertOne(item: ProductDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

}