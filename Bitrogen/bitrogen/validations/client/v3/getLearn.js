module.exports = (req, res, next) => {
    req.checkBody('page', 'page is required').notEmpty()
    req.checkBody('topic', 'topic is required').notEmpty()
    let errors = req.validationErrors();
    if (errors) {
        return res.status(422).json({
            message: errors[0].msg,
            status: 0
        });
    } else {
        next()
    }
}