
    const { response, request } = require('express');
    const jwt = require('jsonwebtoken');

    const User = require('../models/user');
    
    const validateJWT = async( req = request, res = response, next ) => {

        const token = req.header('custom-token');

        if ( !token ){
            return res.status(401).json({
                message: 'No se está enviando el token en la petición.'
            });
        }

        try {

            const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
            const user = await User.findById( uid );

            // Validar que el usuario exista en la colección(DB)
            if ( !user ){
                return res.status(401).json({
                    message: 'El usuario no existe - Usuario Eliminado'
                });
            }
            
            // Validar usuario con estado 'false'
            if ( !user.estado ) {
                return res.status(401).json({
                    message: 'El usuario no está activo - estado "false"'
                });
            }

            req.user = user;
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