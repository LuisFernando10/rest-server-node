
    const Role = require('../models/role');
    
    const isRolValidate = async(rol = '') => {
            
        const existRol = await Role.findOne({ rol });
        if ( !existRol ) {
            throw new Error(`El rol ${ rol } no existe en la colección.`)
        }
    }

    module.exports = {
        isRolValidate
    }