
    const { Router } = require('express');
    const { check } = require('express-validator');
    
    const { logIn } = require('../controllers/login');
    const { validateFields } = require('../middlewares/validate-fields');

    const router = Router();

    router.post('/login/', [
        check('correo', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria.').not().isEmpty(),
        validateFields
    ], logIn );

    module.exports = router;