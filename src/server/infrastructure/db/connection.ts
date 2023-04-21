import mysql, {Connection} from 'mysql2/promise';

export class ConnectionDB {
  private connection?: Connection;

  /**
   * Método encargado de establecer conección con la base de datos
   * mySQL
   */
  async on(): Promise<Connection> {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_DB_HOST,
      user: process.env.MYSQL_DB_USER,
      database: process.env.MYSQL_DB_NAME
    });
    this.connection = connection;
    return connection;
  }//end on

  /**
   * Método encargado de cerrar la conección con la base de 
   * de datos
   */
  off(){
    this.connection?.end();
  }
}