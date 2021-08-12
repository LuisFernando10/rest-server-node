
    const { response, request } = require('express');
    const bcryptjs = require('bcryptjs');

    const User = require('../models/user');
    
    const usersGet = async(req = request, res = response) => {

        const { limit = isNaN(limit) ? 0 : limit, from = 0 } = req.query;
        const users = await User.find()
            .skip( Number(from) )
            .limit( Number(limit) );

        res.json(users);
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
        const { _id, password, google, correo, ...rest } = req.body;

        // Validar contra BD
        if ( password ) {
            // Encriptar contraseña
            const salt = bcryptjs.genSaltSync();
            rest.password = bcryptjs.hashSync( password, salt );
        }

        const user = await User.findByIdAndUpdate( id, rest );

        res.json(user);
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