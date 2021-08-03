
    const { Router } = require('express');
    const { check } = require('express-validator');

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
        check('correo', 'El correo no es válido.').isEmail(),
    ], usersPost );

    router.put('/:id', usersPut );

    router.patch('/', usersPatch );

    router.delete('/', usersDelete );

    module.exports = router;