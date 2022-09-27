module.exports = (req, res, next) => {
    req.checkBody('trader', 'trader is required').notEmpty()
    req.checkBody('symbol_name', 'symbol_name is required').notEmpty()
    req.checkBody('clock', 'clock is required').notEmpty()
    req.checkBody('symbol_img', 'symbol_img is required').notEmpty()
    let errors = req.validationErrors();
    if (errors) {
        return res.status(422).json({
            message: errors[0].msg,
            status: 0
        });
    }
    else {
        next()
    }
}