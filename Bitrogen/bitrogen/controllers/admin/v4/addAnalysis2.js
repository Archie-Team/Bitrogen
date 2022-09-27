const analysisSchema = require("../../../models/analysis")
const traderSchema = require('../../../models/trader')
module.exports = (req, res) => {
    traderSchema.findOne({ username: req.body.trader.toLowerCase() }, (err, response) => {
        if (err) {
            return res.json({ message: err, status: 0 })
        }
        if (response == null) {
            return res.json({ message: 'trader not found', status: 0 })
        }
        // var JDate = require('jalali-date');
        // var jdate = new JDate;
        // var date = `${jdate.getFullYear()}/${jdate.getMonth()}/${jdate.getDate()}`
        // var clock = req.body.clock + ' - ' + date
        var JDate = require('jalali-date');
        var jdate = new JDate;
        const today = jdate.format('dddd DD MMMM YYYY')
        //! here has changed 
        const clock = req.body.clock + ' - ' + today

        const symbolImage = "https://bitrogen.liara.run/public/upload/" + req.body.symbol_img.toLowerCase() + ".png"

        if (req.body.extradesc == 'null') {
            req.body.extradesc = null
        }


        var analysisImage = null
        if (req.file) {
            analysisImage = 'https://bitrogen.liara.run/' + req.file.path
        }

        analysisSchema({
            trader: req.body.trader.toLowerCase(),
            symbol_name: req.body.symbol_name.toUpperCase(),
            symbol_img: symbolImage,
            clock: clock,
            exchange: 'Binance',
            extradesc: req.body.extradesc,
            analysisImage: analysisImage
        }).save(function (err, result) {
            if (err) {
                return res.json({ message: err, status: 0 })
            }
            else {
                fcmSend()
                return res.json({
                    message: 'تحلیل اضافه شد',
                    status: 1
                })
            }
        })
    })


    function fcmSend() {
        var FCM = require('fcm-node');
        var serverKey = 'AAAAmqUHQvA:APA91bGRJnPt2CV5J_p5o1e5jAdvrp6e9qhM9_eWXeaHiYFxnntoa2ubWjuKjj_jIW97g_SlQbXJj-OC0dFC2ZADX8wxMEtxAjUwL1nfVOUVNf_vO8XrDJtetqY5NMomYG_g3eGynNyv';
        var topic1 = '/topics/signal1';
        var fcm = new FCM(serverKey);
        var message = {
            to: topic1,  // either DeviceRegistrationToken or topic1
            notification: {
                title: `بیتروژن`,
                body: `تحلیل جدید اضافه شد`
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