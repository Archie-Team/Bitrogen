module.exports = (req, res, next) => {
    req.checkBody('title', 'title is required').notEmpty()
    req.checkBody('description', 'description is required').notEmpty()
    req.checkBody('topic', 'topic is required').notEmpty()
    let errors = req.validationErrors();
    if (errors) {
        return res.status(422).json({
            message: errors[0].msg,
            status: 0
        });
    }
    else {
        if (req.body.topic < 1 || req.body.topic > 4) {
            return res.json({
                message: 'Wrong topic'
            })
        }
        next()
    }
}