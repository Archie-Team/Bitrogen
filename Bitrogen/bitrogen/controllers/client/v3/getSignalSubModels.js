const addSignalSubSchema = require('../../../models/addSignalSubscription')

module.exports = (req, res) => {
    addSignalSubSchema.find().sort({ 'price': -1 }).exec(function (err, result) {
        if (err) {
            return res.json({ message: 'ارتباط با سرور برقرار نشد', status: 0 })
        }
        return res.json({ result, status: 1 })
    });
}