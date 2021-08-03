
    const { validationResult } = require('express-validator');

    const validateFields = ( req, res, next ) => {

        const errors = validationResult( req );
        if( !errors.isEmpty() ){
            return res.status(400).json(errors);
        }
        next(); // Seguir con el siguiente middleware, en caso de no haber más, pasa al controlador
    };

    module.exports = {
        validateFields
    }