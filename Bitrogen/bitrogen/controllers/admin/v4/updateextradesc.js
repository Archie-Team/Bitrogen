const singalSchema = require('../../../models/signal')
const notifFunc = require('../../../functions/firebaseNotification')
module.exports = (req, res) => {
    let conditions = { _id: req.body.id }
    let update = { stoploss: req.body.extradesc }
    let options = { useFindAndModify: false, new: true }
    singalSchema.findByIdAndUpdate(conditions, update, options, (err, result) => {
        if (err) { return res.json({ message: 'خطا در آپدیت', status: 0 }) }
        // notifFunc.fcmSend(result.symbol_name)
        return res.json({
            message: 'توضیحات این سیگنال تغییر کرد',
            status: 1
        })
    })
}