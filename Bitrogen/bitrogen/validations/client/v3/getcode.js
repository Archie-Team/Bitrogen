module.exports = (req, res, next) => {
    req.checkBody('phone', 'phone is required').notEmpty()
    let errors = req.validationErrors();
    if (errors) {
        return res.status(422).json({
            message: errors[0].msg,
            status: 0
        });
    } else {
        if (req.body.phone.length < 10 || req.body.phone.length > 12) {
            return res.json({ message: 'phone should be 11 characters', status: 0 })
        }
        else {
            next()
        }
    }
}