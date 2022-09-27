const mongoose = require('mongoose')
const schema = mongoose.Schema

//add futures to model
const timeStamp = require('mongoose-timestamp')
const mongoosePaginate = require('mongoose-paginate')

const signalSubSchema = new schema({
    user: { type: schema.Types.ObjectId, required: true, index: true, ref: 'user' },
    paied: { type: Boolean, default: false, index: true },
    months: { type: Number, required: true },
    subName: { type: String, required: true },
    amount: { type: Number, required: true },
    expireYear: { type: Number, default: null },
    expireMonth: { type: Number, default: null },
    expireDay: { type: Number, default: null },
    introducedCode: { type: String, default: null, index: true }
})



signalSubSchema.plugin(timeStamp)
signalSubSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('signalsub', signalSubSchema)
























//inja gharare ye model tarif she ke dar model id taraf va tarikh engheza accountesh bashe
//agar ke vojod dashte bashe ba id taraf inja yani vip kharide
//agar ke vojod nadashte bashe yani taraf nakharide aslan tahala
//agar ke vojod dashte bashe va tarikh enghezash ba tarikh emruz mosavi bashe yani ke user vipish tamum shude