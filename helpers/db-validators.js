
    const Role = require('../models/role');
    const User = require('../models/user');
    
    const isRolValidate = async(rol = '') => {
            
        const existRol = await Role.findOne({ rol });
        if ( !existRol ) {
            throw new Error(`El rol ${ rol } no existe en la colección.`)
        }
    }

    const existEmailInDb = async( correo = '' ) => {

        const extistEmail = await User.findOne({ correo });

        if ( extistEmail ) {
            throw new Error(`El correo ${ correo } no está disponible.`);
        }
    }

    const existUserById = async( id ) => {

        const extistUser = await User.findById(id);

        if ( !extistUser ) {
            throw new Error(`El ID ${ id } no está disponible.`);
        }
    }

    module.exports = {
        isRolValidate,
        existEmailInDb,
        existUserById
    }