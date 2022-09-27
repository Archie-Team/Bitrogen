function checkErrors(req, res, errors) {
    if (errors) {
        return res.status(422).json({
            message: errors[0].msg,
            status: 0
        });
    }
}
module.exports.checkErrors = checkErrors;
