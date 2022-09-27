const userModel = require('../../../models/user')
module.exports = (req, res) => {
    userModel.findById(req.user.id, function (err, user) {
        if (err) {
            return res.json({
                message: 'خطا در پیدا کردن کاربری شما',
                status: 0
            })
        } else {
            return res.json({
                youridCode: user.youridCode,
                introducedAmount: user.introducedAmount,
                introducedTotal: user.introducedTotal,
                status: 1
            })
        }
    })
}