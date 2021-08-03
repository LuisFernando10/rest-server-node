
    const { Router } = require('express');
    const { check } = require('express-validator');

    const { validateFields } = require('../middlewares/validate-fields');
    
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
        check('rol', 'No es un rol permitido.').isIn(['ADMIN', 'USER']),
        validateFields
    ], usersPost );

    router.put('/:id', usersPut );

    router.patch('/', usersPatch );

    router.delete('/', usersDelete );

    module.exports = router;