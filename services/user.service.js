const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const list = async () => {



}
const listById = async ({ id }) => {


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

const update = async (user) => {

}


const remove = async ({ id }) => {


}
const activate = async ({ id }) => {


}





module.exports = {
    list,
    listById,
    create,
    update,
    remove,
    activate
}