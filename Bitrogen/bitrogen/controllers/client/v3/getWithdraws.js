const withdrawSchema = require('../../../models/withdraw')
module.exports = (req, res) => {
    const query = { user: req.user.id }
    const options = { page: 1, limit: 50, sort: { createdAt: -1 } }
    withdrawSchema.paginate(query, options).then((result) => {
        if (result.docs.length == 0) {
            return res.json({ message: 'تراکنشی وجود ندارد', status: 0 })
        } else {
            return res.json({
                'total': result.total,
                'page': result.page,
                'pages': result.pages,
                'status': 1, result: result.docs
            })
        }
    })
}