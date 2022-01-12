//imports
const {pool} = require('./database')

//funcion asincrona que utiliza una transaccion para realizar operaciones en la tabla transferencias y en la tabla usuarios
const transactionTransferir = async (data) => {
    //extraemos los valores
    const [emisor, receptor, monto] = data
    //preparamos las operaciones de cada usuario
    const sqlUsuarioEmisor = {
        text: "UPDATE usuarios SET balance = balance - $1 WHERE id = $2",
        values: [monto, emisor]
    }
    

    const sqlUsuarioReceptor = {
        text: "UPDATE usuarios SET balance = balance + $1 WHERE id = $2",
        values: [monto, receptor]
    }
    
    const sqlTransferencia = {
        text: "INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW()) RETURNING *",
        values: data
    }

    //nos conectamos via el pool
    const client = await pool.connect()

    
    try {
        //comenzamos la transaccion
        await client.query("BEGIN")
        //restamos el monto del emisor
        await client.query(sqlUsuarioEmisor)
        //agregamos el monto al receptor
        await client.query(sqlUsuarioReceptor)
        //si todo ha salido ok, registramos la transferencia
        const res = await client.query(sqlTransferencia)
        //finalmente, hacemos el COMMIT
        await client.query("COMMIT")
        //y retornamos el resultado de la transferencia
        return res
    } catch (error) {
        //si algo ha salido mal hacemos ROLLBACK
        await client.query("ROLLBACK")
        //y lanzamos una excepcion
        throw error
    }
    finally {
        client.release()
    }

}

//funcion asincrona que obtiene todos los registros de la tabla transferencias
const selectTransferencias = async () => {

    //preparamos la consulta
    const sqlQuery = {
        text: "SELECT * FROM transferencias",
        rowMode: "array",
    }

    try {
        //hacemos el select
        const res = await pool.query(sqlQuery)
        //devolvemos el resultado
        return res
    } catch (error) {
        //si algo ha salido mal, arrojamos la excepcion
        throw error
    }
}

//exportamos las funciones
module.exports = {
    transactionTransferir,
    selectTransferencias,
}