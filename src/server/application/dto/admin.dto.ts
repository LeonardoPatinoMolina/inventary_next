export class AdminDTO{
  public id?: number;
  public nombre?: string;
  public password?: string;
  constructor(data: AdminDTO){
    this.id = data.id;
    this.nombre = data.nombre;
    this.password = data.password;
  }
}