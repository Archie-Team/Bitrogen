const ticketSchema = require('../../../models/ticket')
module.exports = (req, res) => {
    const query = { user: req.user.id }
    const options = { page: 1, limit: 100, sort: { createdAt: -1 } }
    ticketSchema.paginate(query, options).then((tickets) => {
        if (tickets.total == 0) {
            return res.json({ message: 'صندوق پیام خالی است', status: 0 })
        }
        return res.json({
            tickets: tickets.docs,
            status: 1
        })
    })
}