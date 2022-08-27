const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require('../helpers/generate-jwt');

const loginService = async (userdata) => {
    const { correo, password } = userdata;
    // Check if the email exists
    const user = await User.findOne({ correo });
    if (!user) {
        return {
            msg: "User / Incorrect password - correo"
        }
    }
    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
        return {
            msg: "User / Incorrect password - correo"
        }
    }

    // Generar el JWT
    const token = await generateJWT(user.id);

    return { user, token }
}
const logoutService = async (userdata) => {
    return 'hola'
}


module.exports = {
    loginService,
    logoutService
};