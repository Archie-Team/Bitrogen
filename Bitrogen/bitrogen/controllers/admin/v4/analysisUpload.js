const analysisSchema = require('../../../models/analysis')

module.exports = (req, res) => {
    if (!req.file) {
        return res.json({ message: 'image in body is required ', status: 0 })
    }
    if (req.file) {
        analysisSchema.findByIdAndUpdate(req.query.id, { analysisImage: 'https://bitrogen.liara.run/' + req.file.path },
            { useFindAndModify: false }, (err, newAnalysis) => {
                if (newAnalysis == null) {
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