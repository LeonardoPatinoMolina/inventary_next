export class Admin {
  private id: number;
  private nombre: string;
  private password: string;

  constructor({
    id,
    nombre,
    password
  }: {
    id: number,
    nombre: string,
    password: string
  }){
    this.id = id;
    this.nombre = nombre;
    this.password = password;
  }
}