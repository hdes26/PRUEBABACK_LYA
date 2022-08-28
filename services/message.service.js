const mqtt = require('mqtt');



const sendMessageService = async ({ message }) => {

    const client = mqtt.connect('mqtt://mqtt.lyaelectronic.com:1883');

    client.on('connect', function () {

        client.publish('presence', message)


    })

    client.on('connect', function (topic, message) {
        // message is Buffer
        console.log(message.toString())
        client.end()
    })

}

module.exports = {
    sendMessageService
}
