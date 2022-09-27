const mongoose = require('mongoose')
const schema = mongoose.Schema

//add futures to model
const timeStamp = require('mongoose-timestamp')
const mongoosePaginate = require('mongoose-paginate')




const analysisSchema = new schema({
    vip: { type: Boolean, required: true, index: true, default: false },
    trader: { type: String, index: true },
    symbol_img: { type: String, default: null },
    symbol_name: { type: String, required: true },
    clock: { type: String, required: true },
    isOpen: { type: Boolean, default: true, index: true },
    exchange: { type: String, required: true },
    extradesc: { type: String, default: null },
    analysisImage: { type: String, default: null }
})


analysisSchema.plugin(timeStamp)
analysisSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('analysis', analysisSchema)