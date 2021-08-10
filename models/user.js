
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
        image: {
            type: String
        },
        rol: {
            type: String,
            required: true,
            enum: ['ADMIN', 'USER', 'VENTAS']
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

    // Sobreescribimos el método 'toJSON' para no mostrar en la respuesta los campos que no deseemos
    userSchema.methods.toJSON = function() {
        const { __v, password, ...usuario } = this.toObject(); // '...usuario', lo que hace es que usa el operador (... 'rest') para unificar las propiedades faltantes en uno solo llamado 'usuario (no importa el nombre)' 
        return usuario;
    }

    module.exports = model( 'Usuario', userSchema );