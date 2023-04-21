import { Repository } from "../common/repository.interface";
import { Product } from "../entities/product.entity";

export interface IProductRepository extends Repository<Product> {

}