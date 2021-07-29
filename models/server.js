
    const express = require('express');
    const cors = require('cors');
    const { dbConnection } = require('../database/config');
    
    class Server {

        constructor() {
            this.app = express();
            this.port = process.env.PORT;
            this.userPath = '/api/usuarios/';

            // Conectar BD
            this.connectDB();

            // Middlewares
            this.middlewares();

            // Rutas Aplicación
            this.routes();
        }

        async connectDB() {
            await dbConnection();
        }

        middlewares() {

            // Cors
            this.app.use( cors() );

            // Lectura y parseo del body
            this.app.use( express.json() );

            // Directorio público
            this.app.use( express.static('public') )
        }

        routes() {
            
            this.app.use(this.userPath, require('../routes/user'));
        }

        listen() {
            this.app.listen(this.port, () => {
                console.log('Corriendo en puerto:', this.port);
            })
        }
    }

    module.exports = Server;