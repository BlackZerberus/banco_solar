//imports 
const fs = require('fs')
const {insertUsuario, selectUsuarios, updateUsuario, deleteUsuario} = require('../model/usuarios')

//funcion que carga un archivo html y lo entrega como respuesta.
const index = (response) => {
    try {
        //cargamos el archivo
        const html = fs.readFileSync('view/index.html', 'utf-8')
        //preparamos los headers
        response.setHeader('content-type', 'text/html')
        //asignamos el codigo de estado OK
        response.statusCode = 200
        // y terminamos el response enviando el archivo
        response.end(html)
    } catch (error) {
        //escribimos el error en consola
        console.log(error)
        //enviamos el codigo de estado 500
        response.statusCode = 500
        //terminamos el response
        response.end()
    }
}

//funcion que maneja el endpoint /usuario POST
const usuarioPost = async (body, response) => {
    try {
        //obtenemos los datos del body como array
        const data = Object.values(JSON.parse(body))
        //realizamos el insert
        await insertUsuario(data)
        //asignamos el codigo 201 si la operacion fue exitosa
        response.statusCode = 201
        //finalizamos el response
        response.end()
    } catch (error) {
        //si hay error lo veremos en la consola
        console.log(error)
        //asignamos un error 500
        response.statusCode = 500
        //y finalizamos el response
        response.end()
    }
}

//funcion que maneja el endpoint /usuarios GET
const usuariosGET = async (response) => {
    try {
        //obtenemos los registros
        const {rows} = await selectUsuarios()
        //header
        response.setHeader('content-type', 'application/json')
        //codigo de estado 200
        response.statusCode = 200
        //finalizamos el response
        response.end(JSON.stringify(rows))
    } catch (error) {
        //si algo ocurre lo notificamos en consola
        console.log(error)
        //response 500
        response.statusCode = 500
        //finalizamos
        response.end()
    }
}

//funcion que maneja el endpoint /usuario PUT
const usuarioPut = async (body, response) => {
    try {
        //obtenemos los datos como array
        const data = Object.values(JSON.parse(body))
        //realizamos el update
        const {rows} = await updateUsuario(data)
        //status code 201
        response.statusCode = 201
        //finalizamos el response
        response.end(JSON.stringify(rows[0]))
    } catch (error) {
        //si hay un error notificamos via consola
        console.log(error)
        //code 500
        response.statusCode = 500
        //finalizamos
        response.end()
    }
}

//funcion que maneja el endpoint /usuario DELETE
const usuarioDelete = async (id, response) => {
    try {
        //realizamos el delete
        deleteUsuario(id)
        //status code 204
        response.statusCode = 204
        //terminando el response
        response.end()
    } catch (error) {
        console.log(error)
        //status code 500
        response.statusCode = 500
        //terminando el response
        response.end()
    }
}
//importamos las funciones
module.exports = {
    index,
    usuarioPost,
    usuariosGET,
    usuarioPut,
    usuarioDelete,
}