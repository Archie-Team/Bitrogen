const randomInt = require('random-int');
const userSchema = require('../../../models/user')
const uniqueString = require('unique-string')
module.exports = (req, res) => {
    const introducedCode = req.body.introducedCode
    let code = randomInt(10000, 100000);
    let conditions = { phone: req.body.phone }
    userSchema.findOne(conditions, function (err, result) {
        if (err) {
            return res.json({ message: err })
        }
        else {
            if (!result) {
                userSchema({
                    phone: req.body.phone,
                    code: code,
                    youridCode: makeid(6),
                    introducedCode: introducedCode,
                    introducedPercent: 9,
                    introducedAmount: 0,
                    introducedCount: 0,
                    introducedTotal: 0
                }).save(err => {
                    if (err) {
                        return res.json({ message: 'ارتباط با سرور برقرار نشد', status: 0 })
                    }
                    else {
                        sendSms_Otp(req, code)
                        console.log(code)
                        return res.json({ message: 'ارسال شد', status: 1 })
                    }
                })
            }
            else {
                let conditions = { _id: result._id }
                let update = { code: code }
                let options = { useFindAndModify: false }
                userSchema.findByIdAndUpdate(conditions, update, options, function (err, result) {
                    if (err) {
                        return res.json({ message: 'ارتباط با سرور برقرار نشد', status: 0 })
                    }
                    else {
                        sendSms_Otp(req, code)
                        console.log(code)
                        return res.json({ message: 'ارسال شد', status: 1 })
                    }
                })
            }
        }
    })
}


function sendSms_Otp(req, code) {
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
            receptor: req.body.phone,
            template: 'bitrogen',
            type: '1',
            param1: code
        }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        // console.log(body);
    });
}



function makeid(length) {
    var result = [];
    var str = uniqueString();
    for (var i = 0; i < length; i++) {
        result.push(str.charAt(Math.floor(Math.random() *
            str.length)));
    }
    return result.join('');
}