const jwt = require('jsonwebtoken')
const config = require('../config')
const userSchema = require('../models/user')
module.exports = (req, res, next) => {

    let token = req.headers['x-access-token']
    let loginId = req.headers['x-access-loginid']//here has changed v3
    if (token && loginId) {
        return jwt.verify(token, config.SECRET_KEY, (err, decode) => {
            if (err) {

                return res.json({ message: 'Not valid token', status: 0 })
            }
            let conditions = { _id: decode.user_id, loginid: loginId }
            userSchema.findOne(conditions, (err, user) => {//here has changed v3
                if (err) {

                    return res.json({ message: 'Token error - couldnt find user', status: 0 })
                }
                if (user != null) {
                    req.user = user
                    next()
                } else {
                    let conditions = { _id: decode.user_id, loginid: null }
                    userSchema.findOne(conditions, (err, user) => {
                        if (err) {

                            return res.json({ message: 'Token error - couldnt find user', status: 0 })
                        }
                        if (user != null) {
                            req.user = user
                            next()
                        } else {

                            return res.json({ message: 'هر شماره فقط میتواند روی یک دستگاه فعال باشد . از اکانت خود خارج شده و دوباره وارد شوید', status: 0 })
                        }
                    })

                    // return res.json({ message: 'هر شماره فقط میتواند روی یک دستگاه فعال باشد . از اکانت خود خارج شده و دوباره وارد شوید', status: 0 })
                }

            })
        })
    }

    return res.json({ message: 'Token is required', status: 0 })
}