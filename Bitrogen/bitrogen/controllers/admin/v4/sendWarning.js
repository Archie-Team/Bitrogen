const warningSchema = require('../../../models/warning')
const singalsubModel = require('../../../models/signalSubscription')//added new 
const randomInt = require('random-int');//added new 
const notifFunc = require('../../../functions/firebaseNotification')
module.exports = (req, res) => {
    warningSchema({
        title: req.body.title,
        message: req.body.message,
    }).save(err => {
        if (err) {
            return res.json({ message: err, status: 0 })
        } else {
            notifFunc.fcmSend('بیتروژن', req.body.message)
            getVipPhone()
            return res.json({ message: 'saved', status: 1 })
        }
    })
    //added new 
    function getVipPhone() {
        let code = randomInt(1000, 10000);
        singalsubModel.paginate({ paied: true }, { populate: ["user"] }).then((result) => {
            var i;
            var text = '';
            for (i = 0; i < result.docs.length; i++) {
                text = text + result.docs[i].user.phone + ','
            }
            text = text.slice(0, -1);
            sendSms_Otp(text, code)
        })
    }

    //added new 
    function sendSms_Otp(phones, code) {
        var request = require("request");
        var options = {
            method: 'POST',
            url: 'https://api.ghasedak.me/v2/verification/send/simple',
            headers:
            {
                'cache-control': 'no-cache',
                apikey: '75e790b0f46328a332d92d15b218b9f32c837856e42d221baf28ed762c80a062',
                'content-type': 'application/x-www-form-urlencoded'
            },
            form:
            {
                receptor: phones,
                template: 'warning',
                type: '1',
                param1: code
            }
        };
        request(options, function (error, response, body) { });
    }
}