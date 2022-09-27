module.exports = (req, res, next) => {
    req.checkBody('profit', 'profit is required').notEmpty()
    req.checkBody('_id', '_id is required').notEmpty()
    let errors = req.validationErrors();
    if (errors) {
        reqErrors.checkErrors(req, res, errors)
    } else {
        if (req.body.profit == 0) {
            return res.json({ message: 'profit cannot be 0' })
        }
        if (req.body.profit > 0) {
            req.signal_type = 2
        } else {
            req.signal_type = 0
        }
        if (req.body.target) {
            if (req.body.profit > 0) {
                if ((req.body.target < 1) || (req.body.target > 3)) {
                    return res.json({ message: 'target can be 1,2,3', status: 0 })
                }
            } else {
                req.body.target = null
            }
        }

        next()
    }
}
