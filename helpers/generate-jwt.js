
    const jwt = require('jsonwebtoken');
    
    const generateJWT = ( uid = '' ) => {

        return new Promise( (resolve, reject) => {

            const payload = { uid };

            jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
                expiresIn: '3h'
            }, ( err, token ) => {
                if ( err )
                    reject('Ocurrió un error al generar el token.');
                else
                    resolve( token );
            });
        });
    };

    module.exports = {
        generateJWT
    }