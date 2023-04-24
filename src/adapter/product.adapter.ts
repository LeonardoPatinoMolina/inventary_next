export class Product {
  public codigo: number;
  public prenda: string;
  public ubicacion: string;
  public talla: number;
  public color: string;
  public sexo: string;
  public valorUnitario: number;
  public cantidad: number;

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