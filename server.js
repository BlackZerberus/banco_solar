//cargamos las variables de entorno
require('dotenv').config()
//imports
const http = require('http')
const {httpRequestHandler} = require('./controller/handlers')
const port = process.env.SERVER_PORT ?? 8080

//instanciamos el servidor
const server = http.createServer(httpRequestHandler)
server.listen(port, () => console.log(`server up!, listen on port: ${port}`))