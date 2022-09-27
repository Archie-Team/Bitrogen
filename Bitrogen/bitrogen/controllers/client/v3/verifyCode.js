const jwt = require('jsonwebtoken')
const config = require('../../../config')
const uniqueString = require('unique-string');
const userSchema = require('../../../models/user')

module.exports = (req, res) => {
    let conditions = { phone: req.body.phone }
    userSchema.findOne(conditions, (err, result) => {
        if (err) {
            return res.json({ message: 'ارتباط برقرار نشد', status: 0 })
        }
        if (result == null) {
            return res.json({ message: 'این شماره تلفن در بیتروژن نیست . شماره خود را دوباره وارد کنید', status: 0 })
        }
        if (req.body.code == result.code) {
            let conditions = { _id: result._id }
            let loginid = uniqueString()
            let update = { code: 0, loginid: loginid }
            let options = { useFindAndModify: false }
            userSchema.findByIdAndUpdate(conditions, update, options, (err, result) => {
                if (err) {
                    return res.json({ message: 'ارتباط با سرور برقرار نشد . دوباره درخواست ارسال کد کنید', status: 0 })
                }
                let token = jwt.sign({ user_id: result._id }, process.env.SECRET_KEY, {})
                return res.json({ message: 'success login', token: token, loginid: loginid, status: 1 })
            })
        } else {
            if (result.loginid == '1') {
                let conditions = { _id: result._id }
                let update = { code: 0, loginid: null }
                let options = { useFindAndModify: false }
                userSchema.findByIdAndUpdate(conditions, update, options, (err, result) => { })
                return res.json({ message: 'کد اشتباه است . به دلیل حفظ امنیت اکانت شما دوباره درخواست ارسال کد کنید', status: 0 })
            }
            let conditions = { _id: result._id }
            let loginid = '1'
            let update = { loginid: loginid }
            let options = { useFindAndModify: false }
            userSchema.findByIdAndUpdate(conditions, update, options, (err, result) => { })
            return res.json({ message: 'کد وارد شده اشتباه است', status: 0 })
        }
    })
}