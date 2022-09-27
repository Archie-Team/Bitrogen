module.exports = (req, res, next) => {
    req.checkBody('price', 'price is required').notEmpty()
    req.checkBody('name', 'name is required').notEmpty()
    req.checkBody('months', 'months is required').notEmpty()
    req.checkBody('dollar', 'dollar is required').notEmpty()
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