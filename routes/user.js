
    const { Router } = require('express');
    const { check } = require('express-validator');

    const { validateFields } = require('../middlewares/validate-fields');
    const { isRolValidate } = require('../helpers/db-validators');
    
    const { 
        usersGet,
        usersPost,
        usersPut,
        usersPatch,
        usersDelete
    } = require('../controllers/user');

    const router = Router(); // Se le configurarán las rutas

    router.get('/', usersGet );

    router.post('/', [
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('password', 'La contraseña debe ser más de 6 caracteres.').isLength({ min: 6 }),
        check('correo', 'El correo no es válido.').isEmail(),
        //check('rol', 'No es un rol permitido.').isIn(['ADMIN', 'USER']),
        check('rol').custom( isRolValidate ), // .custom( (rol) => isRolValidate(rol) ) => Alternativa 'larga' para pasar argumentos, como el primer argumento es el mismo que recibo en mi 'custom', entonces sólo hago la referencia a la función 'isRolValidate' y ya se asume que se pasa como parámetro el rol.
        validateFields
    ], usersPost );

    router.put('/:id', usersPut );

    router.patch('/', usersPatch );

    router.delete('/', usersDelete );

    module.exports = router;