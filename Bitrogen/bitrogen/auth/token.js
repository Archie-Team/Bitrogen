const jwt = require('jsonwebtoken')
const config = require('../config')
const userSchema = require('../models/user')
module.exports = (req, res, next) => {
    let token = req.headers['x-access-token']
    if (token) {
        return jwt.verify(token, config.SECRET_KEY, (err, decode) => {
            if (err) {
                return res.json({ message: 'Not valid token', status: 0 })
            }
            let conditions = { _id: decode.user_id }
            userSchema.findById(conditions, (err, user) => {
                if (err) {
                    return res.json({ message: 'Token error - couldnt find user', status: 0 })
                }
                if (user != null) {
                    req.user = user
                    next()
                } else {
                    return res.json({ message: 'User did not found', status: 0 })
                }

            })
        })
    }
    return res.json({ message: 'Token is required', status: 0 })
}