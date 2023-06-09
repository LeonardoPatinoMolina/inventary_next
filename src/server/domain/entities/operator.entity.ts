export class Operator {
  private id: number;
  private nombre: string;
  private apellido: string;
  private cedula: number;
  private password: string;
  private credential: string;
  
  constructor({
    id,
    apellido,
    cedula,
    credential,
    nombre,
    password
  }: {
    id: number;
    nombre: string;
    apellido: string;
    cedula: number;
    password: string;
    credential: string;
  }){
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.cedula = cedula;
    this.credential = credential;
    this.password = password;
  }
}