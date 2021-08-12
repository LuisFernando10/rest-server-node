
    const { response, request } = require('express');
    const bcryptjs = require('bcryptjs');

    const User = require('../models/user');
    
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

        const { nombre, correo, password, rol } = req.body;
        const user = new User( { nombre, correo, password, rol } );

        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );
        
        // Guardar DB
        await user.save();

        res.json({
            user
        });
    };

    const usersPut = async(req, res = response) => {

        const { id } = req.params;
        const { password, google, correo, ...rest } = req.body;

        // Validar contra BD
        if ( password ) {
            // Encriptar contraseña
            const salt = bcryptjs.genSaltSync();
            rest.password = bcryptjs.hashSync( password, salt );
        }

        const user = await User.findByIdAndUpdate( id, rest );

        res.json({
            message: 'PUT API - controllador',
            user
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