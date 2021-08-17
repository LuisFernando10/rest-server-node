    
    const { response } = require('express');
    const bcryptjs = require('bcryptjs');

    const User = require('../models/user');
    const { generateJWT } = require('../helpers/generate-jwt');

    const logIn = async( req, res = response ) => {

        const { correo, password } = req.body;

        try {
            
            // Verificar si el email existe
            const user = await User.findOne({ correo });
            if ( !user ){
                return res.status(400).json({
                    message: 'Usuario/Contraseña no son correctos - Correo'
                });
            }

            // Verificar si el usuario está activo
            if ( !user.estado ){
                return res.status(400).json({
                    message: 'No es un estado válido para el usuario - Estado'
                });
            }

            //Verificar contraseña
            const valid_password = bcryptjs.compareSync( password, user.password );
            if ( !valid_password ){
                return res.status(400).json({
                    message: 'Contraseña incorrecta. - Contraseña'
                });
            }

            // Generar el JWT
            const token = await generateJWT( user.id );


            res.json({
                user,
                token
            });   
        } catch (error) {
            res.status(500).json({
                message: 'Comuníquese con el administrador.'
            })
        }
    };

    module.exports = {
        logIn
    }