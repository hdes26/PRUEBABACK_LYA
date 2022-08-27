const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const listService = async () => {

    const user = User.find({ active: true });
    return user;

}
const listByIdService = async (id) => {

    const user = await User.findById(id).where({ active: true });
    return user;

}
const createService = async (userdata) => {
    const { name, correo, password } = userdata;
    const user = new User({ name, correo, password });

    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)
        ;
    //Save in db
    return await user.save();

}

const updateService = async (id, userdata) => {

    const { uid, password, correo, ...resto } = userdata

    // Validate password
    if (password) {
        //Encrypt password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, resto);
    return user;

}


const removeService = async (id) => {
    const user = await User.findByIdAndRemove(id);
    return user;
}

const activateService = async (id) => {
    const user = await User.findByIdAndUpdate(id, { active: true });
    return user;
}


module.exports = {
    listService,
    listByIdService,
    createService,
    updateService,
    removeService,
    activateService
}