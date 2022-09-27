module.exports = (req, res, next) => {
    req.checkBody('vip', 'vip is required').notEmpty()
    req.checkBody('trader', 'trader is required').notEmpty()
    req.checkBody('star', 'star is required').notEmpty()

    req.checkBody('symbol_name', 'symbol_name is required').notEmpty()
    req.checkBody('market_type', 'market_type is required').notEmpty()
    req.checkBody('start_zone', 'start_zone is required').notEmpty()
    req.checkBody('end_zone', 'end_zone is required').notEmpty()

    req.checkBody('takeprofit', 'takeprofit is required').notEmpty()
    req.checkBody('stoploss', 'stoploss is required').notEmpty()
    req.checkBody('clock', 'clock is required').notEmpty()
    let errors = req.validationErrors();
    if (errors) {
        return res.status(422).json({
            message: errors[0].msg,
            status: 0
        });
    }
    else {
        if (req.body.star > 5) {
            return res.json({ message: 'star should be less than 5', status: 0 })
        } else {
            next()
        }
    }
}