const singalSchema = require('../../../models/signal')
const notifFunc = require('../../../functions/firebaseNotification')
module.exports = (req, res) => {
    let conditions = { _id: req.body.id }
    let update = { stoploss: req.body.stoploss }
    let options = { useFindAndModify: false, new: true }
    singalSchema.findByIdAndUpdate(conditions, update, options, (err, result) => {
        if (err) { return res.json({ message: 'خطا در آپدیت', status: 0 }) }
        notifFunc.fcmSend('بیتروژن . بروزرسانی سیگنال', `${result.symbol_name}\n\استاپ لاس این سیگنال تغییر کرد`)
        return res.json({
            message: 'استاپ لاس این سیگنال تغییر کرد',
            status: 1
        })
    })
}
