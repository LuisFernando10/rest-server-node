
    const { response, request } = require('express');
    
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

    const usersPost = (req, res = response) => {

        const { nombre, edad, id } = req.body;

        res.json({
            message: 'POST API - controllador',
            nombre,
            edad,
            id
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