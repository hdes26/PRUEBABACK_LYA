const validateFields = require('../middlewares/validate');
const validateJWT = require('../middlewares/validate-jwt');

module.exports = {
    ...validateFields,
    ...validateJWT,
}