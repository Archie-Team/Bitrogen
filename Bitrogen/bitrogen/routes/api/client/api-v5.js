//enable router to give it to index.js to use apis
const express = require('express')
const router = express.Router()



//update checking
const c_appUpdate = require('../../../controllers/client/v5/appUpdate')
router.post('/update', c_appUpdate)//not disable


module.exports = router