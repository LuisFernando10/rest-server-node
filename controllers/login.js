    const { response } = require('express');

    const logIn = ( req, res = response ) => {
        res.json({
            message: 'Controlador Login'
        });
    };

    module.exports = {
        logIn
    }