const mongoose = require('mongoose')
const schema = mongoose.Schema

//add futures to model
const timeStamp = require('mongoose-timestamp')
const mongoosePaginate = require('mongoose-paginate')

const ticketSchema = new schema({
    message: { type: String, required: true, maxlength: 200 },
    awnser: { type: String, default: null },
    awnsered: { type: Boolean, default: false, index: true },
    user: { type: schema.Types.ObjectId, required: true, index: true, ref: 'user' },
})


ticketSchema.plugin(timeStamp)
ticketSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('ticket', ticketSchema)