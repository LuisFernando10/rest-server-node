
    const mongoose = require('mongoose');

    const dbConnection = async() => {

        try {
            
            await mongoose.connect( process.env.MONGOBD_CONNECTION, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            });

            console.log('Base de datos ON');

        } catch (error) {
            console.log(error);
            throw new Error('Error en la conexión de la base de datos.')
        }
    };


    module.exports = {
        dbConnection
    }