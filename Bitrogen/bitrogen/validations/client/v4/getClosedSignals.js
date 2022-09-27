module.exports = (req, res, next) => {
    req.checkBody('market_type', 'market_type is required').notEmpty()
    req.checkBody('details_on', 'details_on is required').notEmpty()
    let errors = req.validationErrors();
    if (errors) {

        return res.status(422).json({
            message: errors[0].msg,
            status: 0
        });
    }
    next()
}