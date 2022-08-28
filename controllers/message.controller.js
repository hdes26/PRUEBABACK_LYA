const { response } = require('express');
const {sendMessageService} = require("../services/message.service");


const sendMessage = async (req, res = response) => {

    try {
        let message = await sendMessageService(req.body);
        res.json(message);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error });
    }
}


module.exports = {
    sendMessage
}