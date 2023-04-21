export class ProductDTO {
  public codigo?: number;
  public prenda?: string;
  public ubicacion?: string;
  public talla?: string;
  public color?: string;
  public sexo?: string;
  public valorUnitario?: string;
  public cantidad?: string;
  public status?: string;

  constructor(data: ProductDTO){
    this.codigo = data?.codigo;
    this.prenda = data?.prenda;
    this.ubicacion = data?.ubicacion;
    this.talla = data?.talla;
    this.color = data?.color;
    this.sexo = data?.sexo;
    this.valorUnitario = data?.valorUnitario;
    this.cantidad = data?.cantidad;
    this.status = data?.status;
  }
}