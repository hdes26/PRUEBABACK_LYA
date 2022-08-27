const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    correo: {
        type: String,
        required: [true, 'Correo is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    active: {
        type: Boolean,
        default: false
    },
});



UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario  } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'User', UserSchema );