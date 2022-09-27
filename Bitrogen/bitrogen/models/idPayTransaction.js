const mongoose = require('mongoose')
const schema = mongoose.Schema


//add futures to model
const timeStamp = require('mongoose-timestamp')
const mongoosePaginate = require('mongoose-paginate')


const idPayTransactionSchema = new schema({
    amount: { type: String, required: true },
    card_no: { type: String, required: true },
    user: { type: schema.Types.ObjectId, required: true, index: true, ref: 'user' },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: String, required: true },
    introducedCode: { type: String, default: null, index: true }
})


idPayTransactionSchema.plugin(timeStamp)
idPayTransactionSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('idpaytransaction', idPayTransactionSchema)