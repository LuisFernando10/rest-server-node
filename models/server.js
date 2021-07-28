
    const express = require('express');
    const cors = require('cors');
    
    class Server {

        constructor() {
            this.app = express();
            this.port = process.env.PORT;
            this.userPath = '/api/usuarios/';

            // Middlewares
            this.middlewares();

            // Rutas Aplicación
            this.routes();
        }

        middlewares() {

            // Cors
            this.app.use( cors() );

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