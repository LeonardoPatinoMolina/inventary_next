const mysql = require( 'mysql2/promise');

(async ()=>{
const connection = await mysql.createConnection({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USER ?? 'root',
  database: process.env.MYSQL_DB_NAME ?? 'seguimientoInventarioSENA'
});


const [r] = await connection.execute({sql: 'SELECT * FROM `tbladministrador` WHERE `adm_id` = ?'},[1]);
console.log(r.length);
connection.end();

})()