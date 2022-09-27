const addsignalsubSchema = require('../../../models/addSignalSubscription')
module.exports = (req, res) => {
    addsignalsubSchema.updateMany({ dollar: req.body.dollar }, (err, result) => {
        if (err) {
            return res.json({
                message: 'با خطا مواجه شد به سروش همون لحظه زنگ بزنید', status: 0
            })
        }
        return res.json({ message: 'قیمت دلار آپدیت شد', status: 1 })
    })
}