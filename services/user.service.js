const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const list = async () => {

    const user = User.find({ active: true });
    return user;

}
const listById = async (id) => {

    const user = await User.findById(id).where({ active: true });
    return user;

}
const create = async (userdata) => {
    const { name, email, password } = userdata;
    const user = new User({ name, email, password });

    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)

    //Save in db
    return await user.save();

}

const update = async (id, userdata) => {

    const { uid, password, email, ...resto } = userdata

    // Validate password
    if (password) {
        //Encrypt password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, resto);
    return user;

}


const remove = async (id) => {
    const user = await User.findByIdAndRemove(id);
    return user;
}

const activate = async (id) => {
    const user = await User.findByIdAndUpdate(id, { active: true });
    return user;
}


module.exports = {
    list,
    listById,
    create,
    update,
    remove,
    activate
}