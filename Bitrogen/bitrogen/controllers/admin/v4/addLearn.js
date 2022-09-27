const learnSchema = require('../../../models/learn')
module.exports = (req, res) => {
    learnSchema({
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        image: req.body.image,
        topic: req.body.topic
    }).save(err => {
        if (err) {
            return res.json({ message: err, status: 0 })
        } else {
            return res.json({ message: 'saved', status: 1 })
        }
    })
}