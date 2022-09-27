const warningSchema = require('../../../models/warning')
module.exports = (req, res) => {
    let conditions = { _id: req.body.id }
    warningSchema.findByIdAndDelete(conditions, (err, result) => {
        if (err) {
            return res.json({ message: 'مشکل در پاک کردن این هشدار', status: 0 })
        }
        return res.json({ message: 'هشدار پاک شد', status: 1 })
    })
}