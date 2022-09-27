const learnSchema = require('../../../models/learn')
module.exports = (req, res) => {
    let options = { page: Number(req.body.page), limit: 50, sort: { createdAt: 1 } }
    learnSchema.paginate({ topic: req.body.topic }, options).then((result) => {
        if (result.docs.length == 0) {
            return res.json({ message: 'در حال حاضر آموزشی وجود ندارد', status: 0 })
        }
        return res.json({
            'total': result.total,
            'page': result.page,
            'pages': result.pages,
            'status': 1, result: result.docs
        })
    })
}