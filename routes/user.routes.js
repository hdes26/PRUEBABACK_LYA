const { Router } = require('express');
const { check } = require('express-validator');
const {
    validateFields,
    validateJWT,
    validateBlacklist,
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




/**
 * @swagger
 * components:
 *  securitySchemes: 
 *      ApiKeyAuth: 
 *          type: apiKey
 *          name: Authorization
 *          in: header
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *              description: the user name
 *          correo:
 *              type: string
 *              description: the user correo
 *          password:
 *              type: string
 *              description: the user password
 *      required:
 *         - name
 *         - correo
 *         - password
 *      example:
 *         name: Hernan
 *         correo: prueba123@gmail.com 
 *         password: a123456 
 */  

//create user
/**
 *@swagger
 * /users:
 *  post:
 *      summary: create a new user
 *      tags: [User]
 *      requestBody:
 *          requerid: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: new user created!
 */ 
router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password must be more than 6 letters').isLength({ min: 6 }),
    check('correo', 'The email is not valid').isEmail(),
    check('correo').custom(emailExists),
    validateFields
], createUser);


// update user
/**
 *@swagger
 * /users/{id}:
 *  put:
 *      security:
 *        - ApiKeyAuth: [Authorization]
 *      summary: update user
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: uid 
 *      requestBody:
 *          requerid: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: updated user!

 *          401:
 *              description: invalid token
 */ 
router.put('/:id', [
    validateJWT,
    validateBlacklist,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(UserExistsById),
    validateFields
], updateUser);


//delete user
/**
 *@swagger
 * /users/{id}:
 *  delete:
 *      security:
 *        - ApiKeyAuth: [Authorization]
 *      summary: delete user
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: uid 
 *      responses:
 *          200:
 *              description: deleted user!

 *          401:
 *              description: invalid token
 */ 
router.delete('/:id', [
    validateJWT,
    validateBlacklist,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(UserExistsById),
    validateFields
], deleteUser);


//activate user
/**
 *@swagger
 * /users/{id}/active:
 *  patch:
 *      security:
 *        - ApiKeyAuth: [Authorization]
 *      summary: activate user
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: uid 
 *      responses:
 *          200:
 *              description: activated user!

 *          401:
 *              description: invalid token
 */ 
router.patch('/:id/active', [
    validateJWT,
    validateBlacklist,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(UserExistsById),
    validateFields
], activateUser);


//get user
/**
 *@swagger
 * /users/{id}:
 *  get:
 *      security:
 *        - ApiKeyAuth: [Authorization]
 *      summary: get activated user
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: uid 
 *      responses:
 *          200:
 *              description: obtained activated user!

 *          401:
 *              description: invalid token
 */ 
router.get('/:id', [
    validateJWT,
    validateBlacklist,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(UserExistsById),
    validateFields
], getUser);



//get users
/**
 *@swagger
 * /users/:
 *  get:
 *      security:
 *        - ApiKeyAuth: [Authorization]
 *      summary: get activated users
 *      tags: [User]
 *      responses:
 *          200:
 *              description: obtained activated users!

 *          401:
 *              description: invalid token
 */ 
router.get('/', [
    validateJWT,
    validateBlacklist,
    validateFields
], getUsers);




module.exports = router;