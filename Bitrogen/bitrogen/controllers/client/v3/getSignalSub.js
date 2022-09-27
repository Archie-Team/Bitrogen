const signalsub = require('../../../models/signalSubscription')
module.exports = (req, res) => {
    signalsub.findOne({ user: req.user.id, paied: true }, (err, result) => {
        if (err) {
            return res.json({ message: 'اشتراک شما پیدا نشد', status: 0 })
        }
        if (result == null) {
            return res.json({ message: 'اشتراک ندارید', status: 0 })
        }
        return res.json({ result, status: 1 })
    })
}