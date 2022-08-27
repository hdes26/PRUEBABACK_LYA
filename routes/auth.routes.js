const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate');

const {login,logout} = require('../controllers/auth.controller');


const router = Router();

router.post('/',[
    check('correo', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
],login );
router.delete('/',logout );



module.exports = router;