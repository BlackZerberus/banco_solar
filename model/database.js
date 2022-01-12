//cargamos las variables de entorno
require('dotenv').config()
//imports 
const {Pool} = require('pg')

//asignamos las variables de entorno
const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME} = process.env

//creamos un objeto con los datos de configuracion
const config = {
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME, 
}

//instanciamos el pool
const pool = new Pool(config)

//importamos el pool para trabajar con las distintas tablas en diferentes archivos
module.exports = {
    pool,
}
