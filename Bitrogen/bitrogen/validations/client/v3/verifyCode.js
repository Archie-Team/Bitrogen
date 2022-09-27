module.exports = (req, res, next) => {
    req.checkBody('phone', 'phone is required').notEmpty()
    req.checkBody('code', 'code is required').notEmpty()
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
        else if (req.body.code.length < 4 || req.body.code.length > 6) {
            return res.json({ message: 'code sould be 5 characters', status: 0 })
        }
        else {
            next()
        }
    }
}