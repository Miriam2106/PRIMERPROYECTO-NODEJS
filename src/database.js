const mysql = require('mysql');

// para dar soporte a realizar rollbacks, promises y async/await
const {promisify} = require('util');
const {database} = require('./keys.js');
//crea la conexión
const pool = mysql.createPool(database);

pool.getConnection((err, conn) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log("DATABASE WAS CLOSED");
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.log("DATABASE HAS TO MANY CONNECTIONS");
        }
        if(err.code === 'ECONNREFUSED'){
            console.log("DATABASE CONNECTIONS REFUSED");
        }
    }

    if(conn) conn.release();
    console.log("DATABASE IS CONNECTED");
    return;
});

pool.query = promisify(pool.query);
module.exports = pool;