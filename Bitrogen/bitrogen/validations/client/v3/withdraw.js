module.exports = (req, res, next) => {
    req.checkBody('card_no', 'card_no is required').notEmpty()
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