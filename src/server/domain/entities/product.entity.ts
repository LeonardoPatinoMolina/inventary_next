export class Product {
  private codigo: number;
  private prendaId: number;
  private ubicacion: string;
  private talla: number;
  private colorId: number;
  private sexo: string;
  private valorUnitario: number;
  private cantidad: number;
  private status: number;

  constructor({
    codigo,
    prendaId,
    ubicacion,
    talla,
    colorId,
    sexo,
    valorUnitario,
    cantidad,
    status,
  }: {
    codigo: number;
    prendaId: number;
    ubicacion: string;
    talla: number;
    colorId: number;
    sexo: string;
    valorUnitario: number;
    cantidad: number;
    status: number;
  }) {
    this.codigo = codigo;
    this.prendaId = prendaId;
    this.ubicacion = ubicacion;
    this.talla = talla;
    this.colorId = colorId;
    this.sexo = sexo;
    this.valorUnitario = valorUnitario;
    this.cantidad = cantidad;
    this.status = status;
  }

  getCantidad(){
    return this.cantidad;
  }
  getValorUnitario(){
    return this.valorUnitario;
  }
}
