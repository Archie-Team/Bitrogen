const mongoose = require('mongoose')
const schema = mongoose.Schema


//add futures to model
const timeStamp = require('mongoose-timestamp')
const mongoosePaginate = require('mongoose-paginate')


const traderSchema = new schema({
    username: { type: String, index: true, required: true, unique: true },
    point: { type: Number, default: 0 },
})


traderSchema.plugin(timeStamp)
traderSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('trader', traderSchema)