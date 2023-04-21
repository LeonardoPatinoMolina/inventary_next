export class RecordDTO {
  public id?: number;
  public fecha?: Date;
  public hora?: Date;
  public operacionId?: number;
  public operatorId?: number;
  public productId?: number;

  constructor({ 
    fecha, 
    hora, 
    id, 
    operacionId, 
    operatorId, 
    productId 
  }: RecordDTO) {
    this.fecha = fecha;
    this.id = id;
    this.hora = hora;
    this.operacionId = operacionId;
    this.productId = productId;
    this.operatorId = operatorId;
  }
}
