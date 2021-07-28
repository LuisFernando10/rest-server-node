
    const { response } = require('express');
    
    const usersGet = (req, res = response) => {
        res.json({
            message: 'GET API - controllador'
        });
    };

    const usersPost = (req, res = response) => {
        res.json({
            message: 'POST API - controllador'
        });
    };

    const usersPut = (req, res = response) => {
        res.json({
            message: 'PUT API - controllador'
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