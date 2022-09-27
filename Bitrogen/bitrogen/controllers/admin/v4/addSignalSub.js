const addSignalSubSchema = require('../../../models/addSignalSubscription')

module.exports = (req, res) => {
    addSignalSubSchema({
        price: req.body.price,
        name: req.body.name,
        months: req.body.months,
        dollar: req.body.dollar
    }).save(err => {
        if (err) {
            return res.json({ message: err, status: 0 })
        }
        return res.json({ message: 'saved', status: 1 })
    })
}