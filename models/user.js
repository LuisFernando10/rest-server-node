
    const { Schema, model } = require('mongoose');

    const userSchema = Schema({
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio.']
        },
        correo: {
            type: String,
            required: [true, 'El correo es obligatorio.'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria.']
        },
        rol: {
            type: String,
            required: true,
            enum: ['ADMIN', 'USER']
        },
        estado: {
            type: Boolean,
            default: true
        },
        google: {
            type: Boolean,
            default: false
        }
    });

    module.exports = model( 'Usuario', userSchema );