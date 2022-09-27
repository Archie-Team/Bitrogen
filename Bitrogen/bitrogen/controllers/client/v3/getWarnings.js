const warningSchema = require('../../../models/warning')
module.exports = (req, res) => {
    let options = { sort: { createdAt: -1 } }
    warningSchema.paginate({}, options).then((result) => {
        if (result.docs.length == 0) {
            return res.json({ message: 'سیگنالی در حال حاضر وجود ندارد', status: 0 })
        } else {
            return res.json({ result: result.docs, status: 1 })
        }
    })
}