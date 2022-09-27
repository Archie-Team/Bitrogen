//enable express router 
const express = require('express')
const router = express.Router()

//Client apis with versions
const api_v3 = require('./client/api-v3')
const api_v4 = require('./client/api-v4')
const api_v5 = require('./client/api-v5')
router.use('/v3', api_v3)
router.use('/v4', api_v4)
router.use('/v5', api_v5)



//Admin apis with versions
const admin_v4 = require('./admin/admin-v4')
router.use('/admin_v4', admin_v4)

module.exports = router











//Robot apis with versions
// const robot_v1 = require('./robot/robot-v1')
// router.use('/robot_v1', robot_v1)