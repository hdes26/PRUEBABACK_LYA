const { Router } = require('express');
const { check } = require('express-validator');
const { sendMessage } = require('../controllers/message.controller');
const { validateFields } = require('../middlewares');

const router = Router();

router.post('/send',[
    check('message', 'Message is required').not().isEmpty(),
    validateFields
],sendMessage );



module.exports = router;