
    const { Router } = require('express');
    const { check } = require('express-validator');

    const { validateFields } = require('../middlewares/validate-fields');
    const { validateJWT } = require('../middlewares/validate-jwt');
    
    const { isRolValidate, existEmailInDb, existUserById } = require('../helpers/db-validators');
    
    const { 
        usersGet,
        usersPost,
        usersPut,
        usersPatch,
        usersDelete
    } = require('../controllers/user');

    const router = Router(); // Se le configurarán las rutas

    // GET
    router.get('/', usersGet );

    // POST
    router.post('/', [
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('password', 'La contraseña debe ser más de 6 caracteres.').isLength({ min: 6 }),
        check('correo', 'El correo no es válido.').isEmail(),
        check('correo').custom( existEmailInDb ),
        //check('rol', 'No es un rol permitido.').isIn(['ADMIN', 'USER']),
        check('rol').custom( isRolValidate ), // .custom( (rol) => isRolValidate(rol) ) => Alternativa 'larga' para pasar argumentos, como el primer argumento es el mismo que recibo en mi 'custom', entonces sólo hago la referencia a la función 'isRolValidate' y ya se asume que se pasa como parámetro el rol.
        validateFields
    ], usersPost );

    
    // PUT
    router.put('/:id', [
        check('id', 'No es un ID válido.').isMongoId(),
        check('id').custom( existUserById ),
        check('rol').custom( isRolValidate ),
        validateFields
    ], usersPut );

    // PATCH
    router.patch('/', usersPatch );

    // DELETE
    router.delete('/:id', [
        validateJWT,
        check('id', 'No es un ID válido.').isMongoId(),
        check('id').custom( existUserById ),
        validateFields
    ], usersDelete );

    module.exports = router;