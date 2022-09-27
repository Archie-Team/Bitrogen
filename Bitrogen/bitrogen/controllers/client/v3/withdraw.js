const userSchema = require('../../../models/user')
const withdrawSchema = require('../../../models/withdraw')
module.exports = (req, res) => {
    userSchema.findById(req.user.id, function (err, user) {
        if (user.introducedAmount >= 1000000) {
            let conditions = { _id: user.id }
            let update = { introducedAmount: 0, introducedCount: 0 }
            let options = { useFindAndModify: false }
            userSchema.findByIdAndUpdate(conditions, update, options, (err, result) => {
                if (err) {
                    return res.json({
                        message: 'دوباره تلاش کنید',
                        status: 0
                    })
                } else {
                    var JDate = require('jalali-date');
                    var jdate = new JDate;
                    var date = `${jdate.getFullYear()}/${jdate.getMonth()}/${jdate.getDate()}`
                    withdrawSchema({
                        amount: user.introducedAmount,
                        didSend: false,
                        user: user.id,
                        date: date,
                        card_no: req.body.card_no
                    }).save()
                    return res.json({
                        message: 'برداشت موفقیت آمیز بود و در اول ماه اینده به حساب شما واریز خواهد شد',
                        status: 1
                    })
                }
            })
        } else {
            return res.json({
                message: 'حداقل میزان برداشت ۱۰۰ هزار تومان میباشد',
                status: 0
            })
        }
    })
}