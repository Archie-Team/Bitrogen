const analysisSchema = require('../../../models/analysis')

module.exports = (req, res) => {
    let options = { page: 1, limit: 200, sort: { createdAt: -1 } }
    const query = { isOpen: true }
    analysisSchema.paginate(query, options).then((result) => {
        if (result.docs.length == 0) {
            return res.json({ message: 'تحلیل جدیدی وجود ندارد', status: 0 })
        }
        return res.json({
            'status': 1, result: result.docs
        })
    })
}