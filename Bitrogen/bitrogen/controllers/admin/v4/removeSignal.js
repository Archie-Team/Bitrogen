const signalSchema = require('../../../models/signal')
module.exports = (req, res, next) => {
    let conditions = { _id: req.body._id }
    signalSchema.findOneAndDelete(conditions, function (err, response) {
        if (err) {
            return res.json({ message: err, status: 0 })
        }
        return res.json({ message: 'deleted successfuly', status: 1 })
    })
}