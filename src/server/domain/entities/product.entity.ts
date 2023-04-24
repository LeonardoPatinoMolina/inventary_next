export class Product {
  private codigo: number;
  private prendaId: number;
  private prenda?: string;
  private ubicacion: string;
  private talla: number;
  private colorId: number;
  private color?: string;
  private sexo: string;
  private valorUnitario: number;
  private cantidad: number;
  private status: number;

  constructor({
    codigo,
    prendaId,
    prenda,
    ubicacion,
    talla,
    colorId,
    color,
    sexo,
    valorUnitario,
    cantidad,
    status,
  }: {
    codigo: number;
    prendaId: number;
    prenda?: string;
    ubicacion: string;
    talla: number;
    colorId: number;
    color?: string;
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
    this.color = color;
    this.prenda = prenda;
  }

  getCantidad(){
    return this.cantidad;
  }
  getValorUnitario(){
    return this.valorUnitario;
  }
}
