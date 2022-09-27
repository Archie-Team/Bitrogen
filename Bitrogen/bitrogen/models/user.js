const mongoose = require('mongoose')
const schema = mongoose.Schema


//add futures to model
const timeStamp = require('mongoose-timestamp')
const mongoosePaginate = require('mongoose-paginate')


const userSchema = new schema({
    phone: { type: Number, required: true, unique: true, minlength: 11, maxlength: 14, index: true },
    code: { type: Number, default: 0 },
    loginid: { type: String, default: null },//new
    youridCode: { type: String, default: null, unique: true, index: true },
    introducedCode: { type: String, default: null, index: true },
    introducedAmount: { type: Number, default: null },
    introducedPercent: { type: Number, default: null, index: true },
    introducedCount: { type: Number, default: null, index: true },
    introducedTotal: { type: Number, default: null, index: true }
})


userSchema.plugin(timeStamp)
userSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('user', userSchema)