const ticketSchema = require('../../../models/ticket')
module.exports = (req, res) => {
    ticketSchema.find({ awnsered: false }, (err, result) => {
        if (err) {
            return res.json({ message: 'خطا در خواندن تیکت ها', status: 0 })
        }
        return res.json({ result, status: 1 })
    })
}