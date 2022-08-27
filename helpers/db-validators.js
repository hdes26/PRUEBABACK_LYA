const User = require('../models/user');


const emailExists = async( correo = '' ) => {

    // Check if the email exist
    const emailExists = await User.findOne({ correo });
    if ( emailExists ) {
        throw new Error(`The email: ${ correo } is already registered`);
    }
}

const UserExistsById = async( id ) => {

    // Check if the user exist
    const userExists = await User.findById(id);
    if ( !userExists ) {
        throw new Error(`the id not exist ${ id }`);
    }
}



module.exports = {
    emailExists,
    UserExistsById
}