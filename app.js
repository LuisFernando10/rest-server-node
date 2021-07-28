require('dotenv').config();

const Server = require('./models/server');

//Instancia
const server = new Server();

server.listen();