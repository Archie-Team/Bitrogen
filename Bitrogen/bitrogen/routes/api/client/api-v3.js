//enable router to give it to index.js to use apis
const express = require('express')
const router = express.Router()




const tokenAuth = require('../../../auth/token')
const signalAuth = require('../../../auth/signalSub')
const token_loginIdAuth = require('../../../auth/token_loginId')

//update checking
const c_appUpdate = require('../../../controllers/client/v3/appUpdate')
router.post('/update', c_appUpdate)




//getlearns v3 new is find by topic - topic added to learn model 
const c_getLearn = require('../../../controllers/client/v3/getLearn')
const v_getLearn = require('../../../validations/client/v3/getLearn')
router.post('/getlearn', v_getLearn, c_getLearn)

//verifyCode v3 - added loginId for only one device can have the app
const c_verifyCode = require('../../../controllers/client/v3/verifyCode')
const v_verifyCode = require('../../../validations/client/v3/verifyCode')
router.post('/verifycode', v_verifyCode, c_verifyCode)

//Get signalSubscription Models that usually is 4 
const c_getSignalSubModels = require('../../../controllers/client/v3/getSignalSubModels')
router.post('/getsignalsubmodels', c_getSignalSubModels)

//idpay create link
const c_idPayCreate = require('../../../controllers/client/v3/idPayCreate')
const v_idPayCreate = require('../../../validations/client/v3/idPayCreate')
router.post('/idpaycreate', tokenAuth, v_idPayCreate, c_idPayCreate)

//get user subscription
const c_getSignalSub = require('../../../controllers/client/v3/getSignalSub')
router.post('/getsignalsub', tokenAuth, c_getSignalSub)

//sendTicket for signal subscriptions users
const c_sendTicket = require('../../../controllers/client/v3/sendTicket')
const v_sendTicket = require('../../../validations/client/v3/sendTicket')
router.post('/sendticket', tokenAuth, signalAuth, v_sendTicket, c_sendTicket)

//get Tickets
const c_getTickets = require('../../../controllers/client/v3/getTickets')
router.post('/gettickets', tokenAuth, c_getTickets)


//get Signals
const c_getSignals = require('../../../controllers/client/v3/getSignal')
const v_getSignals = require('../../../validations/client/v3/getSignal')
router.post('/getsignal', token_loginIdAuth, signalAuth, v_getSignals, c_getSignals)



//get Warnings
const c_getWarnings = require('../../../controllers/client/v3/getWarnings')
router.post('/getwarnings', tokenAuth, c_getWarnings)



//money Managment
const c_moneyManagment = require('../../../controllers/client/v3/moneyManagment')
const token = require('../../../auth/token')
router.post('/moneymng', token, signalAuth, c_moneyManagment)


//get Code from v1 is new now
const c_getCode = require('../../../controllers/client/v3/getCode')
const v_getCode = require('../../../validations/client/v3/getcode')
router.post('/getcode', v_getCode, c_getCode)


//withdraw
const c_withdraw = require('../../../controllers/client/v3/withdraw')
const v_withdraw = require('../../../validations/client/v3/withdraw')
router.post('/withdraw', tokenAuth, v_withdraw, c_withdraw)


//yourIdCode
const c_getIntroducedCode = require('../../../controllers/client/v3/getIntoducedCode')
router.post('/idcode', tokenAuth, c_getIntroducedCode)


//getWithdraws
const c_getwithdraws = require('../../../controllers/client/v3/getWithdraws')
router.post('/getwithdraws', tokenAuth, c_getwithdraws)


//getAnalysis
const c_getAnalysis = require('../../../controllers/client/v3/getAnalysis')
router.post('/getanalysis', tokenAuth, c_getAnalysis)


//topHunderd crypto
const c_topHundred = require('../../../controllers/client/v3/topHundred')
router.post('/tophundred', c_topHundred)//!need token and login id

//get crypto Prices
const c_cryptoPrices = require('../../../controllers/client/v3/cryptoPrices')
router.post('/cryptoprices', c_cryptoPrices) //!need token and login id
module.exports = router

