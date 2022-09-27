const analysisSchema = require('../../../models/analysis')
module.exports = (req, res) => {
    analysisSchema.findByIdAndDelete(req.body.id, function (err, result) {
        if (err) {
            return res.json({
                message: 'خطا در بستن این تحلیل',
                status: 0
            })
        }
        return res.json({
            message: 'تحلیل پاک شد',
            status: 1
        })
    })
}