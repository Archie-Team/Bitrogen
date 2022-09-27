module.exports = (req, res, next) => {
    req.checkBody('_id', '_id is required').notEmpty()
    let errors = req.validationErrors();
    if (errors) {
        reqErrors.checkErrors(req, res, errors)
        return
    } else {
        next()
    }
}