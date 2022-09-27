const ticketSchema = require('../../../models/ticket')

module.exports = (req, res) => {
    let conditions = { _id: req.body.id }
    let update = { awnsered: true, awnser: req.body.awnser }
    let options = { useFindAndModify: false }
    ticketSchema.findByIdAndUpdate(conditions, update, options, (err, result) => {
        if (err) {
            return res.json({ message: 'پیام کاربر اپدیت نشد', status: 0 })
        }
        return res.json({ message: 'پیام شما ارسال شد', status: 1 })
    })
}