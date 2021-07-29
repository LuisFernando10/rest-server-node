
    const { Router } = require('express');

    const { 
        usersGet,
        usersPost,
        usersPut,
        usersPatch,
        usersDelete
    } = require('../controllers/user');

    const router = Router(); // Se le configurarán las rutas

    router.get('/', usersGet );

    router.post('/', usersPost );

    router.put('/:id', usersPut );

    router.patch('/', usersPatch );

    router.delete('/', usersDelete );

    module.exports = router;