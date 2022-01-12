//imports
const {pool} = require('./database')

//funcion asincrona que inserta un nuevo usuario
const insertUsuario = async (data) => {

    //creamos un objeto que tendra un query preparado con los datos
    const sqlQuery = {
        text: "INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *",
        values: data
    }

    try {
        //realizamos el insert
        const res = await pool.query(sqlQuery)
        return res
    } catch (error) {
        throw error
    }
}

//funcion asincrona que devuelve todos los registros de usuarios
const selectUsuarios = async() => {
    try {
        //realizamos el select
        const res = await pool.query("SELECT * FROM usuarios ORDER BY id ASC")
        return res

    } catch (error) {
        throw error
    }
}

//funcion asincrona que actualiza un registro de la tabla usuarios
const updateUsuario = async (data) => {
    
    //preparamos un objeto con el los datos a realizar
    const sqlQuery = {
        text: "UPDATE usuarios SET nombre = $2, balance = $3 WHERE id = $1 RETURNING *",
        values: data
    }

    try {
        //realizamos el insert
        const res = await pool.query(sqlQuery)
        return res
    } catch (error) {
        throw error
    }
}

//funcion asincrona que elimina un usuario
const deleteUsuario = async (id) => {
    //preparando el delete
    const sqlQuery = {
        text: "DELETE FROM usuarios WHERE id=$1",
        values: [id]
    }

    try {
        //ejecutando el delete
        await pool.query(sqlQuery)
    } catch (error) {
        throw error
    }
} 

//exportamos las funciones
module.exports = {
    insertUsuario,
    selectUsuarios,
    updateUsuario,
    deleteUsuario,
}