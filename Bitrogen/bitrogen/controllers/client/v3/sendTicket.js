const ticketSchema = require('../../../models/ticket')
module.exports = (req, res) => {
    ticketSchema({
        message: req.body.message,
        user: req.user.id
    }).save(err => {
        if (err) {
            // console.log(err)
            return res.json({
                message: 'پیام ارسال نشد دوباره تلاش کنید',
                status: 0
            })
        }
        return res.json({
            message: 'پیام شما با موفقیت ارسال شد',
            status: 1
        })
    })
}