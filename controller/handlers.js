//imports
const url = require('url') 
const {index, usuarioPost, usuariosGET, usuarioPut, usuarioDelete} = require('./controllerUsuarios')
const {transferenciaPost, transferenciasGet} = require('./controllerTransferencias')

const httpRequestHandler = async(request, response) => {
    
    //endpoint /
    if (request.url === '/' && request.method === 'GET') {
        index(response)
    }

    //endpoint /usuario POST
    if(request.url === '/usuario' && request.method === 'POST') {
        //creamos una variable body
        let body = ''
        //evento data del request
        request.on("data", (payload) => {
            body += payload
        })

        //evento end del request
        request.on("end", () => {
            usuarioPost(body, response)
        })
    }

    //endpoint /usuarios GET
    if(request.url === '/usuarios' && request.method === 'GET') {
        usuariosGET(response)
    }

    //endpoint /usuario PUT
    if(request.url === '/usuario' && request.method === 'PUT') {

        let body = ''
        //evento data
        request.on("data", (payload) => {
            body += payload
        })

        //evento end
        request.on("end", () => {
            usuarioPut(body, response)
        })
    }

    //endpoint /usuario DELETE
    if(request.url.startsWith('/usuario') && request.method === 'DELETE') {
        const {id} = url.parse(request.url, true).query
        usuarioDelete(id, response)
    }

    //endpoint /transferencia POST
    if(request.url === '/transferencia' && request.method === 'POST') {
        
        let body = ''
        
        //evento data
        request.on("data", (payload) => {
            body += payload
        })

        //evento end
        request.on("end", () => {
            transferenciaPost(body, response)
        })
    }

    //endpoint /transferencias GET
    if(request.url === '/transferencias' && request.method === 'GET') {
        transferenciasGet(response)
    }
}

//exportamos los handlers
module.exports = {
    httpRequestHandler,
}