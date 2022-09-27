const analysisSchema = require('../../../models/analysis')
module.exports = (req, res) => {
    analysisSchema.findByIdAndUpdate(req.body.id, { isOpen: false }, function (err, result) {
        if (err) {
            return res.json({
                message: 'خطا در بستن این تحلیل',
                status: 0
            })
        }
        return res.json({
            message: 'تحلیل بسته شد',
            status: 1
        })
    })
}