export class Record {
  private id: number;
  private fecha: Date;
  private hora: Date;
  private operacionId: number;
  private operatorId: number;
  private productId: number;

  constructor({fecha,hora,id,operacionId, operatorId,productId}: Record){
    this.fecha = fecha;
    this.id = id;
    this.hora = hora;
    this.operacionId = operacionId;
    this.productId = productId;
    this.operatorId = operatorId;
  }
}