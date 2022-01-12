//imports
const {transactionTransferir, selectTransferencias} = require('../model/transferencias')

//funcion encargada de manejar el endpoint /transferencia POST
const transferenciaPost = async(body, response) => {

    try {
        //convertimos en array los datos enviados por el body
        const data = Object.values(JSON.parse(body))
        //hacemos la transaccion
        const {rows} = await transactionTransferir(data)
        //asignamos el codigo 201
        response.statusCode = 201
        //terminamos el response
        response.end(JSON.stringify(rows[0]))
    } catch (error) {
        //si algo ha salido mal, asignamos el codigo 500
        response.statusCode = 500
        //mostramos via consola el problema
        console.log(error)
        //y terminamos el response
        response.end()
    }

}

//funcion encargada de manejar el endpoint /transferencias GET
const transferenciasGet = async (response) => {

    try {
        //realizamos la consulta
        const {rows} = await selectTransferencias()
        //asignamos el codigo 200
        response.statusCode = 200
        //terminamos el response y enviamos los datos
        response.end(JSON.stringify(rows))
    } catch (error) {
        //si algo sale mal, asignamos el codigo 500
        response.statusCode = 500
        //lo mostramos por consola
        console.log(error)
        //y cerramos el response enviando el error
        response.end(error)        
    }
}

//exportamos las funciones
module.exports = {
    transferenciaPost,
    transferenciasGet,
}