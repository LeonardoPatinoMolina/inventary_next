export class Product {
  public userId: string;
  public codigo: string;
  public prenda: string;
  public ubicacion: string;
  public talla: string;
  public color: string;
  public sexo: string;
  public valorUnitario: string;
  public cantidad: string;

  constructor({
    userId = "",
    codigo = "",
    prenda = "",
    ubicacion = "",
    talla = "",
    color = "",
    sexo = "",
    valorUnitario = "",
    cantidad = ""}
  ) {
    this.userId = userId;
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