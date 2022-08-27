const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('Authorization');

    if ( !token ) {
        return res.status(401).json({
            msg: 'The token is required'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // leer el usuario que corresponde al uid
        const user = await User.findById( uid );

        if( !user ) {
            return res.status(401).json({
                msg: 'Invalid token - user not exist in db'
            })
        }

        // Check active = true 
        if ( !user.estado ) {
            return res.status(401).json({
                msg: 'Invalid token - user with active: false'
            })
        }
        
        
        req.user = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        })
    }

}




module.exports = {
    validateJWT
}