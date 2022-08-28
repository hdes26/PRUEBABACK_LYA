const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate');

const {login,logout} = require('../controllers/auth.controller');


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
 *    Auth:
 *      type: object
 *      properties:
 *          correo:
 *              type: string
 *              description: the user correo
 *          password:
 *              type: string
 *              description: the user password
 *      required:
 *         - correo
 *         - password
 *      example:
 *         correo: prueba123@gmail.com 
 *         password: a123456 
 */ 

//login
/**
 *@swagger
 * /authorization:
 *  post:
 *      summary: login
 *      tags: [Auth]
 *      requestBody:
 *          requerid: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Auth'
 *      responses:
 *          200:
 *              description: successful login!
 */ 
router.post('/',[
    check('correo', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
],login );


//logout
/**
 *@swagger
 * /authorization:
 *  delete:
 *      security:
 *        - ApiKeyAuth: [Authorization]
 *      summary: logout
 *      tags: [Auth]
 *      responses:
 *          200:
 *              description: successful logout!

 *          401:
 *              description: invalid token
 */ 
router.delete('/',logout );



module.exports = router;