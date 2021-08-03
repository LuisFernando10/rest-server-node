
    const { response, request } = require('express');
    const bcryptjs = require('bcryptjs');

    const User = require('../models/user');
const { validationResult } = require('express-validator');
    
    const usersGet = (req = request, res = response) => {

        const { q, nombre = 'Not Name', apikey, page = '1', limit } = req.query;

        res.json({
            message: 'GET API - controllador',
            q,
            nombre,
            apikey,
            page,
            limit
        });
    };

    const usersPost = async(req, res = response) => {

        const errors = validationResult( req );
        if( !errors.isEmpty() ){
            return res.status(400).json(errors);
        }
        
        const { nombre, correo, password, rol } = req.body;
        const user = new User( { nombre, correo, password, rol } );

        // Verificar existencia correo
        const extistEmail = await User.findOne({ correo });
        if ( extistEmail ){
            return rest.status(400).json({
                message: 'El correo no está disponible.'
            });
        }

        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );
        
        // Guardar DB
        await user.save();

        res.json({
            message: 'POST API - controllador',
            user
        });
    };

    const usersPut = (req, res = response) => {

        const { id } = req.params;

        res.json({
            message: 'PUT API - controllador',
            id
        });
    };

    const usersPatch = (req, res = response) => {
        res.json({
            message: 'PATCH API - controllador'
        });
    };

    const usersDelete = (req, res = response) => {
        res.json({
            message: 'DELETE API - controllador'
        });
    };

    module.exports = {
        usersGet,
        usersPost,
        usersPut,
        usersPatch,
        usersDelete
    }