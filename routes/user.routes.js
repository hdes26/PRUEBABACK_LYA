const { Router } = require('express');
const { check } = require('express-validator');
const {
    validateFields,
    validateJWT,
} = require('../middlewares');

const { UserExistsById, emailExists } = require('../helpers/db-validators');

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    activateUser
} = require('../controllers/user.controller');

const router = Router();


router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password must be more than 6 letters').isLength({ min: 6 }),
    check('correo', 'The email is not valid').isEmail(),
    check('correo').custom(emailExists),
    validateFields
], createUser);
router.put('/:id', [
    validateJWT,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(UserExistsById),
    validateFields
], updateUser);
router.delete('/:id', [
    validateJWT,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(UserExistsById),
    validarCampos
], deleteUser);
router.patch('/:id/active', [
    validateJWT,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(UserExistsById),
    validarCampos
], activateUser);
router.get('/:id', [
    validateJWT,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(UserExistsById),
    validarCampos
], getUser);

router.get('/', [
    validateJWT,
    validarCampos
], getUsers);




module.exports = router;