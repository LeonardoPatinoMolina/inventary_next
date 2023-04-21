export class OperatorDTO {
  public id?: number;
  public nombre?: string;
  public apellido?: string;
  public cedula?: number;
  public password?: string;
  public credential?: string;
  
  constructor({
    id,
    apellido,
    cedula,
    credential,
    nombre,
    password
  }: OperatorDTO){
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.cedula = cedula;
    this.credential = credential;
    this.password = password;
  }
}