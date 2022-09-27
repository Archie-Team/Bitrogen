const signalSchema = require('../../../models/signal')

module.exports = (req, res) => {
    if (!req.file) {
        return res.json({ message: 'image in body is required ', status: 0 })
    }
    if (req.file) {
        signalSchema.findByIdAndUpdate(req.query.id, { extraimg: 'https://bitrogen.liara.run/' + req.file.path },
            { useFindAndModify: false }, (err, newuser) => {
                console.log(newuser)
                if (newuser == null) {
                    return res.json({ message: 'there is not product with this id' })
                }
                if (err) {
                    return res.json({ message: err })
                } else {
                    return res.json({
                        message: 'uploaded successfully',
                        status: 1
                    })
                }
            })
    } else {
        return res.json({ message: 'no file', status: 0 })
    }
}