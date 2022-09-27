const mongoose = require('mongoose')
const schema = mongoose.Schema

const timeStamp = require('mongoose-timestamp')
const mongoosePaginate = require('mongoose-paginate')


const withdrawSchema = new schema({
    amount: { type: Number, required: true },
    didSend: { type: Boolean, default: false, index: true },
    user: { type: schema.Types.ObjectId, required: true, index: true, ref: 'user' },
    date: { type: String, required: true },
    card_no: { type: Number, required: true }
})


withdrawSchema.plugin(timeStamp)
withdrawSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('withdraw', withdrawSchema)