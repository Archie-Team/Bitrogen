module.exports = (req, res, next) => {
    req.checkBody('message', 'message is required').notEmpty()
    let errors = req.validationErrors();
    if (errors) {
        return res.status(422).json({
            message: errors[0].msg,
            status: 0
        });
    }
    else {
        if (req.paied == false) {
            return res.json({ message: 'شما اشتراک ندارید', status: 0 })
        } else {
            if (req.body.message.length < 30) {
                return res.json({
                    message: 'پیام شما خیلی کوتاه است',
                    status: 0
                })
            } else {
                next()
            }
        }
    }
}