
    const express = require('express');
    
    class Server {

        constructor() {
            this.app = express();
            this.port = process.env.PORT

            // Middlewares
            this.middlewares();

            // Rutas Aplicación
            this.routes();
        }

        middlewares() {

            // Directorio público
            this.app.use( express.static('public') )
        }

        routes() {
            
            this.app.get('/api/', (req, res) => {
                res.json({
                    message: 'GET API'
                });
            });

            this.app.put('/api/', (req, res) => {
                res.json({
                    message: 'PUT API'
                });
            })

            this.app.post('/api/', (req, res) => {
                res.json({
                    message: 'POST API'
                });
            })

            this.app.delete('/api/', (req, res) => {
                res.json({
                    message: 'DELETE API'
                });
            })
        }

        listen() {
            this.app.listen(this.port, () => {
                console.log('Corriendo en puerto:', this.port);
            })
        }
    }

    module.exports = Server;