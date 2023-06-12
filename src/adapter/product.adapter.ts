export class Product {
  public readonly codigo: number;
  public readonly prenda: string;
  public readonly ubicacion: string;
  public readonly talla: number;
  public readonly color: string;
  public readonly sexo: string;
  public readonly valorUnitario: number;
  public readonly cantidad: number;

  constructor({
    codigo = 0,
    prenda = "",
    ubicacion = "",
    talla = 0,
    color = "",
    sexo = "",
    valorUnitario = 0,
    cantidad = 0}
  ) {
    this.codigo = codigo;
    this.prenda = prenda;
    this.ubicacion = ubicacion;
    this.talla = talla;
    this.color = color;
    this.sexo = sexo;
    this.valorUnitario = valorUnitario;
    this.cantidad = cantidad;
  }
}