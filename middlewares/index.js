const validateFields = require('../middlewares/validate');
const validateJWT = require('../middlewares/validate-jwt');
const validateBlacklist = require('../middlewares/validate-blacklist');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateBlacklist
}