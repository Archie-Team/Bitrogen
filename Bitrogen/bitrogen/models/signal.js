const mongoose = require('mongoose')
const schema = mongoose.Schema

//add futures to model
const timeStamp = require('mongoose-timestamp')
const mongoosePaginate = require('mongoose-paginate')




const signalSchema = new schema({
    vip: { type: Boolean, required: true, index: true },
    trader: { type: String, index: true },
    symbol_img: { type: String, default: null },
    symbol_name: { type: String, required: true },
    clock: { type: String, required: true },
    star: { type: Number, required: true },
    market_type: { type: String, required: true, index: true },//spot feautures margin
    signal_type: { type: Number, default: 1, index: true },//0 is bad 1 is open 2 is green
    leverage: { type: Number, default: null },
    zone: { type: String, default: null },
    takeprofit: [{ type: String, required: true }],
    stoploss: { type: String, required: true },
    l_or_s: { type: String, default: null },
    exchange: { type: String, required: true },
    extradesc: { type: String, default: null },
    extraimg: { type: String, default: null },
    profit: { type: Number, default: null },
    target: { type: Number, default: null }
})


signalSchema.plugin(timeStamp)
signalSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('signal', signalSchema)