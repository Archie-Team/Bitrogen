const { response } = require('express');
const signalSchema = require('../../../models/signal');
var target = null
module.exports = (req, res) => {
    let conditions = { _id: req.body._id }
    target = req.body.target
    let update = { profit: parseInt(req.body.profit, 10), signal_type: req.signal_type, target: target };
    let options = { useFindAndModify: false, new: true }
    signalSchema.findByIdAndUpdate(conditions, update, options, function (err, response) {
        if (err) {
            return res.json({ message: err, status: 0 })
        }
        fcmSend(response.symbol_name)
        return res.json({ message: 'updated', status: 1 })
    })


    function fcmSend(symbolname) {
        var FCM = require('fcm-node');
        let description;
        if (req.body.profit > 0) {
            description = `${symbolname} به تارگت رسید `
        } else {
            description = `${symbolname} به استاپ لاس رسید`
        }
        var serverKey = 'AAAAmqUHQvA:APA91bGRJnPt2CV5J_p5o1e5jAdvrp6e9qhM9_eWXeaHiYFxnntoa2ubWjuKjj_jIW97g_SlQbXJj-OC0dFC2ZADX8wxMEtxAjUwL1nfVOUVNf_vO8XrDJtetqY5NMomYG_g3eGynNyv';
        var topic1 = '/topics/signal1';
        var fcm = new FCM(serverKey);
        var message = {
            to: topic1,  // either DeviceRegistrationToken or topic1
            notification: {
                title: 'بیتروژن . نتیجه سیگنال',
                body: description
            },
        };
        fcm.send(message, function (err, response) {
            if (err) {
                // console.log(err);
            } else {
                // console.log("Successfully sent with response: ", response);
            }
        });
    }

}