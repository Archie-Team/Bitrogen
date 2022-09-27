const addsignalsubSchema = require('../../../models/addSignalSubscription')
const signalsub = require('../../../models/signalSubscription')
module.exports = (req, res) => {
    addsignalsubSchema.findById(req.body.id, (err, signalSubModel) => {
        if (err) {
            return res.json({ message: err, status: 0 })
        }
        if (signalSubModel == null) {
            return res.json({ message: 'this is not bitrogen subscription model', status: 0 })
        }

        const months = signalSubModel.months
        const amount = signalSubModel.price * signalSubModel.dollar
        const link = `https://idpay.ir/bitrogen?amount=${amount}&&desc=${req.user._id}`

        signalsub.findOne({ user: req.user._id }, (err, foundSub) => {
            if (err) {
                return res.json({ message: err, status: 0 })
            }
            if (foundSub == null) {
                createSubscription(req.user._id, amount, link, months, signalSubModel.name)
            }
            else {
                if (foundSub.paied == false) {
                    signalsub.findByIdAndDelete(foundSub._id, (err, result) => {
                        createSubscription(req.user._id, amount, link, months, signalSubModel.name)
                    })
                } else {
                    return res.json({ message: 'در حال حاضر اشتراک دارید', status: 0 })
                }
            }
        })
    })

    function createSubscription(id, amount, link, months, subName) {
        signalsub({
            user: req.user._id,
            amount: amount,
            months: months,
            subName: subName,
            introducedCode: req.user.introducedCode
        }).save(err => {
            if (err) {
                return res.json({ message: 'دوباره تلاش کنید', status: 0 })
            }
            return res.json({ message: link, status: 1 })
        })
    }
}
