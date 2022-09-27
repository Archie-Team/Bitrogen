const { months } = require('jalali-moment')
const signalsub = require('../models/signalSubscription')
module.exports = (req, res, next) => {
    signalsub.findOne({ user: req.user.id, paied: true }, (err, result) => {
        if (err) {
            return res.json({ message: 'شما اشتراک ندارید', status: 0 })
        }
        if (result == null) {
            req.paied = false
            next()
        } else {
            const JDate = require('jalali-date');
            const jdate = new JDate;
            if (jdate.getFullYear() > result.expireYear) {
                deleteSub(result.id)
            } else {
                if (jdate.getDate() >= result.expireDay) {
                    if (jdate.getMonth() >= result.expireMonth) {
                        if (jdate.getFullYear() >= result.expireYear) {
                            deleteSub(result.id)
                        } else {
                            req.paied = true
                            next()
                        }
                    } else {
                        //added later
                        req.paied = true
                        next()
                    }
                } else {
                    if (jdate.getMonth() >= result.expireMonth) {
                        if (jdate.getFullYear() >= result.expireYear) {
                            deleteSub(result.id)
                        } else {
                            req.paied = true
                            next()
                        }
                    } else {
                        //added later
                        req.paied = true
                        next()
                    }
                }
            }
        }

    })


    function deleteSub(id) {
        signalsub.findByIdAndDelete(id, (err, result) => {
            if (err) {

                return res.json({ message: 'اشتراک شما به پایان رسیده', status: 0 })
            }

            return res.json({ message: 'اشتراک شما به پایان رسیده', status: 0 })
        })
    }
}



// {
//     "_id" : ObjectId("608a9ab385106a0012a3a000"),
//     "paied" : true,
//     "expireYear" : 1401,
//     "expireMonth" : 1,
//     "expireDay" : 1,
//     "user" : ObjectId("5ff6ea7f5adeb70012c6ac3e"),
//     "amount" : 8248400,
//     "months" : 1,
//     "subName" : "سطح  ۱",
//     "updatedAt" : ISODate("2021-04-29T11:38:27.979Z"),
//     "createdAt" : ISODate("2021-04-29T11:38:27.979Z"),
//     "__v" : 0
// }
