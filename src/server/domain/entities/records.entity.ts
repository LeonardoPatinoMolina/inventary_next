export class Record {
  private id: number;
  private fecha: string;
  private hora: string;
  private operacionId: number;
  private operacion?: string;
  private operatorId: number;
  private operadorCedula?: number;
  private operadorNombre?: string;
  private productId: number;

  constructor({ 
    fecha, 
    hora, 
    id, 
    operacionId, 
    operacion,
    operatorId, 
    operadorCedula,
    operadorNombre,
    productId 
  }: Record) {
    this.fecha = fecha;
    this.id = id;
    this.hora = hora;
    this.operacionId = operacionId;
    this.productId = productId;
    this.operatorId = operatorId;
    this.operadorCedula = operadorCedula;
    this.operadorNombre = operadorNombre;
    this.operacion = operacion;
  }
}
