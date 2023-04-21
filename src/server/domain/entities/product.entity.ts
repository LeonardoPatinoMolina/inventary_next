export class Product {
  private codigo: number;
  private prenda: string;
  private ubicacion: string;
  private talla: string;
  private color: string;
  private sexo: string;
  private valorUnitario: string;
  private cantidad: string;
  private status: string;

  constructor({
    codigo,
    prenda,
    ubicacion,
    talla,
    color,
    sexo,
    valorUnitario,
    cantidad,
    status,
  }: {
    codigo: number;
    prenda: string;
    ubicacion: string;
    talla: string;
    color: string;
    sexo: string;
    valorUnitario: string;
    cantidad: string;
    status: string;
  }) {
    this.codigo = codigo;
    this.prenda = prenda;
    this.ubicacion = ubicacion;
    this.talla = talla;
    this.color = color;
    this.sexo = sexo;
    this.valorUnitario = valorUnitario;
    this.cantidad = cantidad;
    this.status = status;
  }
}
