//enable router to give it to index.js to use apis
const express = require('express')
const router = express.Router()

const token_loginIdAuth = require('../../../auth/token_loginId')
const tokenAuth = require('../../../auth/token')

//update checking
const c_appUpdate = require('../../../controllers/client/v4/appUpdate')

router.post('/update', c_appUpdate)//not disable


const c_getClosedSignals = require('../../../controllers/client/v4/getClosedSignals')
const v_getClosedSignals = require('../../../validations/client/v4/getClosedSignals')

router.post('/getclosedsignals', token_loginIdAuth, v_getClosedSignals, c_getClosedSignals)

const c_idPayCreate = require('../../../controllers/client/v4/idPayCreate')
const v_idPayCreate = require('../../../validations/client/v3/idPayCreate')
router.post('/idpaycreate', tokenAuth, v_idPayCreate, c_idPayCreate)



//!new
const c_getSignal = require('../../../controllers/client/v4/getSignal')
const v_getSignal = require('../../../validations/client/v4/getSignal')
router.post('/getsignal', token_loginIdAuth, v_getSignal, c_getSignal)


const c_getCode = require('../../../controllers/client/v4/getCode')
const v_getCode = require('../../../validations/client/v3/getcode')
router.post('/getcode', v_getCode, c_getCode)



module.exports = router