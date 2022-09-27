const signalsub = require('../../../models/signalSubscription')
const idPayTransaction = require('../../../models/idPayTransaction')
const userModel = require('../../../models/user')
module.exports = (req, res) => {
    if (req.body.payer) {
        signalsub.findOne({ user: req.body.payer.desc, paied: false }, (err, foundSub) => {
            if (err) {
                return res.json({ message: 'اشتراک شما مشکل دارد', status: 0 })
            }
            if (foundSub == null) {
                return res.json({ message: 'ابتدا باید لینک اشتراک ایجاد کنید یا اشتراک دارید', status: 0 })
            }
            if (Number(req.body.payment.amount) == foundSub.amount) {
                const JDate = require('jalali-date');
                const jdate = new JDate;
                let newYear;
                let newMonth;
                let newDay;

                //here is month if month be bigger than 12 so its new year and new month 
                if ((foundSub.months + jdate.getMonth()) > 12) {
                    newMonth = (foundSub.months + jdate.getMonth()) - 12
                    newYear = jdate.getFullYear() + 1
                } else {
                    newMonth = jdate.getMonth() + foundSub.months
                    newYear = jdate.getFullYear()
                }
                if (jdate.getDate() >= 28) {
                    newDay = 1
                    newMonth += 1
                } else {
                    newDay = jdate.getDate()
                }

                //added new 13.2.1400 
                // if (newMonth == 13) {
                //     newMonth = 1
                // }


                let conditions = { _id: foundSub._id }
                let update = { expireYear: newYear, expireMonth: newMonth, expireDay: newDay, paied: true }
                let options = { useFindAndModify: false }
                signalsub.findByIdAndUpdate(conditions, update, options, (err, updatedSub) => {
                    if (err) {
                        return res.json({ message: err, status: 0 })
                    }
                    idPayTransaction({
                        amount: req.body.payment.amount,
                        card_no: req.body.payment.card_no,
                        user: req.body.payer.desc,
                        phone: req.body.payer.phone,
                        name: req.body.payer.name,
                        date: `${newYear}-${newMonth}-${newDay}`,
                        introducedCode: updatedSub.introducedCode
                    }).save()
                    userModel.findOne({ youridCode: updatedSub.introducedCode }, (err, result) => {
                        signalsub.findOne({ user: result._id, paied: true }, (err, foundSub) => {
                            if (err) {
                                //donothing yet
                            } else {
                                if (foundSub != null) {
                                    let conditions = { _id: result._id }
                                    const intCount = result.introducedCount + 1
                                    const intTotal = result.introducedTotal + 1
                                    const intAmount = ((req.body.payment.amount * 9) / 100) + result.introducedAmount
                                    let update = { introducedCount: intCount, introducedAmount: parseInt(intAmount, 10), introducedTotal: intTotal }
                                    let options = { useFindAndModify: false }
                                    userModel.findByIdAndUpdate(conditions, update, options, (err, result) => { })
                                }
                            }
                        })
                    })
                    return res.json({ message: 'اشتراک شما فعال شد', status: 1 })
                })
            } else {
                return res.json({ message: 'you cheated on bitrogen', status: 0 })
            }
        })
    } else {
        return res.json({ message: 'no payment', status: 0 })
    }
}
































// const signalsub = require('../../../models/signalSubscription')
// const idPayTransaction = require('../../../models/idPayTransaction')
// const userModel = require('../../../models/user')
// module.exports = (req, res) => {
//     // if (req.body.payer) {
//     signalsub.findOne({ user: '60b4cf80e34d6c240feebeef', paied: false }, (err, foundSub) => {
//         if (err) {
//             return res.json({ message: 'اشتراک شما مشکل دارد', status: 0 })
//         }
//         if (foundSub == null) {
//             return res.json({ message: 'ابتدا باید لینک اشتراک ایجاد کنید یا اشتراک دارید', status: 0 })
//         }
//         if (39999960 == foundSub.amount) {
//             const JDate = require('jalali-date');
//             const jdate = new JDate;
//             let newYear;
//             let newMonth;
//             let newDay;

//             //here is month if month be bigger than 12 so its new year and new month 
//             if ((foundSub.months + jdate.getMonth()) > 12) {
//                 newMonth = (foundSub.months + jdate.getMonth()) - 12
//                 newYear = jdate.getFullYear() + 1
//             } else {
//                 newMonth = jdate.getMonth() + foundSub.months
//                 newYear = jdate.getFullYear()
//             }
//             if (jdate.getDate() >= 28) {
//                 newDay = 1
//                 newMonth += 1
//             } else {
//                 newDay = jdate.getDate()
//             }

//             //added new 13.2.1400 
//             if (newMonth == 13) {
//                 newMonth = 1
//             }


//             let conditions = { _id: foundSub._id }
//             let update = { expireYear: newYear, expireMonth: newMonth, expireDay: newDay, paied: true }
//             let options = { useFindAndModify: false }
//             signalsub.findByIdAndUpdate(conditions, update, options, (err, updatedSub) => {
//                 if (err) {
//                     return res.json({ message: err, status: 0 })
//                 }
//                 // idPayTransaction({
//                 //     amount: req.body.payment.amount,
//                 //     card_no: req.body.payment.card_no,
//                 //     user: req.body.payer.desc,
//                 //     phone: req.body.payer.phone,
//                 //     name: req.body.payer.name,
//                 //     date: `${newYear}-${newMonth}-${newDay}`,
//                 //     introducedCode: updatedSub.introducedCode
//                 // }).save()
//                 userModel.findOne({ youridCode: updatedSub.introducedCode }, (err, result) => {
//                     signalsub.findOne({ user: result._id, paied: true }, (err, foundSub) => {
//                         if (err) {
//                             //donothing yet
//                         } else {
//                             if (foundSub != null) {
//                                 let conditions = { _id: result._id }
//                                 const intCount = result.introducedCount + 1
//                                 const intAmount = ((39999960 * 9) / 100) + result.introducedAmount
//                                 let update = { introducedCount: intCount, introducedAmount: parseInt(intAmount, 10) }
//                                 let options = { useFindAndModify: false }
//                                 userModel.findByIdAndUpdate(conditions, update, options, (err, result) => { })
//                             }
//                         }
//                     })
//                 })
//                 return res.json({ message: 'اشتراک شما فعال شد', status: 1 })
//             })
//         } else {
//             return res.json({ message: 'you cheated on bitrogen', status: 0 })
//         }
//     })
//     // } else {
//     //     return res.json({ message: 'no payment', status: 0 })
//     // }


//     function introductionUpdate(userId) {
//         userModel.findOne({ youridCode: updatedSub.introducedCode }, (err, result) => {
//             signalsub.findOne({ user: userId, paied: false }, (err, foundSub) => {
//                 if (err) {
//                     //donothing yet
//                 } else {
//                     if (foundSub != null) {
//                         let conditions = { _id: userId }
//                         const intCount = result.introducedCount + 1
//                         const intAmount = result.introducedAmount
//                         let update = { introducedCount: code }
//                         let options = { useFindAndModify: false }
//                         userModel.findByIdAndUpdate(conditions, update, options, (err, result) => { })
//                     }
//                 }
//             })
//         })
//     }
// }
