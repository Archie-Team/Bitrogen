
const express = require('express')
const router = express.Router()

//auth
const token = require('../../../auth/token')

const c_rsi = require('../../../controllers/robot/v1/rsi')
const v_rsi = require('../../../validations/robot/v1/rsi')
router.post('/rsi', v_rsi, c_rsi)



const c_rsi_Futures = require('../../../controllers/robot/v1/rsi_Futures')
const v_rsi_Futures = require('../../../validations/robot/v1/rsi_Futures')
router.post('/rsi_Futures', v_rsi_Futures, c_rsi_Futures)

const c_sma_ema = require('../../../controllers/robot/v1/pcSmaEma')
const v_sma_ema = require('../../../validations/robot/v1/pcSmaEma')
router.post('/pc_sma_ema', v_sma_ema, c_sma_ema)

const c_sma_ema_Futures = require('../../../controllers/robot/v1/pcSmaEma_Futures')
const v_sma_ema_Futures = require('../../../validations/robot/v1/pcSmaEma_Futures')
router.post('/pc_sma_ema_f', v_sma_ema_Futures, c_sma_ema_Futures)

const c_gdCross = require('../../../controllers/robot/v1/gdCross')
const v_gdCross = require('../../../validations/robot/v1/gdCross')
router.post('/gdcross', v_gdCross, c_gdCross)


const c_gdCross_Futures = require('../../../controllers/robot/v1/gdCross_Futures')
const v_gdCross_Futures = require('../../../validations/robot/v1/gcCross_Fututres')
router.post('/gdcross_f', v_gdCross_Futures, c_gdCross_Futures)

module.exports = router