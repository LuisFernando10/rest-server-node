
    const { response, request } = require('express');
    const jwt = require('jsonwebtoken');
    
    const validateJWT = ( req = request, res = response, next ) => {

        const token = req.header('custom-token');

        if ( !token ){
            return res.status(401).json({
                message: 'No se está enviando el token en la petición.'
            });
        }

        try {

            const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

            req.uid = uid;

            next();

        } catch (error) {
            console.log(error);
            res.status(401).json({
                message: 'El token no es válido.'
            });
        }
    };

    module.exports = {
        validateJWT
    }