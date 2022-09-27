const randomInt = require('random-int');
const userSchema = require('../../../models/user')
const uniqueString = require('unique-string')
const smsFunc = require('../../../functions/sendSms')
const JDate = require('jalali-date');
const signalSubSchema = require('../../../models/signalSubscription')


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
                }).save((err, user) => {
                    if (err) {
                        return res.json({ message: 'ارتباط با سرور برقرار نشد', status: 0 })
                    }
                    else {
                        smsFunc.smsSend(req.body.phone, code, 'bitrogen')
                        console.log(code)
                        createSub(user.id)
                        return res.json({ message: '۱۵ روز اشتراک رایگان برای شما فعال شد', status: 2 })
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
                        smsFunc.smsSend(req.body.phone, code, 'bitrogen')
                        console.log(code)
                        return res.json({ message: 'ارسال شد', status: 1 })
                    }
                })
            }
        }
    })
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

function createSub(id) {
    const jdate = new JDate;
    let newYear = jdate.getFullYear()
    let newMonth;
    let newDay;
    if ((jdate.getDate() + 15) > 28) {
        newMonth = jdate.getMonth() + 1
        newDay = jdate.getDate() + 15 - 30
    } else {
        newMonth = jdate.getMonth()
        newDay = jdate.getDate() + 15
    }
    if (newMonth == 13) {
        newMonth = 1
        newYear = newYear + 1
    }


    signalSubSchema({
        user: id,
        paied: true,
        months: 1,
        subName: 'رایگان',
        amount: 0,
        expireYear: newYear,
        expireMonth: newMonth,
        expireDay: newDay
    }).save(err => {
        console.log(err)
    })
}