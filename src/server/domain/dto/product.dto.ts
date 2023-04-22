export class ProductDTO {
  public codigo?: number;
  public prendaId?: string;
  public ubicacion?: string;
  public talla?: number;
  public colorId?: string;
  public sexo?: string;
  public valorUnitario?: number;
  public cantidad?: number;
  public status?: number;

  constructor(data: ProductDTO){
    this.codigo = data?.codigo;
    this.prendaId = data?.prendaId;
    this.ubicacion = data?.ubicacion;
    this.talla = data?.talla;
    this.colorId = data?.colorId;
    this.sexo = data?.sexo;
    this.valorUnitario = data?.valorUnitario;
    this.cantidad = data?.cantidad;
    this.status = data?.status;
  }
}