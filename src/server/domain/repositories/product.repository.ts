import { ProductDTO } from "../dto/product.dto";
import { Repository } from "../common/repository.interface";
import { Product } from "../entities/product.entity";

export interface IProductRepository extends Repository<Product, ProductDTO> {

}