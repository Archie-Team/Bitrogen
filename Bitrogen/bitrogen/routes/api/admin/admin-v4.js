const express = require('express')
const router = express.Router()

const adminToken = require('../../../auth/adminToken')
const { uploadauth } = require('../../../auth/image')

//update StopLoss
const c_updateStoploss = require('../../../controllers/admin/v4/updateStoploss')
const v_updateStoploss = require('../../../validations/admin/v4/updateStoploss')
router.post('/updatestoploss', adminToken, v_updateStoploss, c_updateStoploss)


//add signal version4 - added change time - token validation added
const c_addSignal = require('../../../controllers/admin/v4/addSignal')
const v_addSignal = require('../../../validations/admin/v4/addSignal')//no changes so used v1
router.post('/addsignal', adminToken, v_addSignal, c_addSignal)


//addLearn version3=>new is topic in learnModel
const c_addLearn = require('../../../controllers/admin/v4/addLearn')
const v_addLearn = require('../../../validations/admin/v4/addLearn')
router.post('/addlearn', v_addLearn, c_addLearn)




//idpay callback after pay
const c_idPayCallback = require('../../../controllers/admin/v4/idPayCallback')
router.post('/idpaycallback', c_idPayCallback)







//closeSignalWithProfit
const c_closeSignal = require('../../../controllers/admin/v4/closeSignal')
const v_closeSignal = require('../../../validations/admin/v4/closeSignal')
router.post('/closesignal', v_closeSignal, c_closeSignal)



//removeSignal
const c_removeSignal = require('../../../controllers/admin/v4/removeSignal')
const v_removeSignal = require('../../../validations/admin/v4/removeSignal')
router.post('/removesignal', v_removeSignal, c_removeSignal)



//getTickets - not awnser its another api
const c_getTickets = require('../../../controllers/admin/v4/getTickets')
router.post('/gettickets', adminToken, c_getTickets)



//awnser a Ticket
const c_awnserTicket = require('../../../controllers/admin/v4/awnserTicket')
const v_awnserTicket = require('../../../validations/admin/v4/awnserTicket')
router.post('/awnserticket', adminToken, v_awnserTicket, c_awnserTicket)


//uploadimage newer
const c_signalUpload = require('../../../controllers/admin/v4/signalUpload')
router.post('/image', uploadauth.single('image'), c_signalUpload)




//sendNotif newer
const c_sendNotif = require('../../../controllers/admin/v4/sendNotif')
const v_sendNotif = require('../../../validations/admin/v4/sendNotif')
router.post('/notif', v_sendNotif, c_sendNotif)





//sendWarning
const c_sendWarning = require('../../../controllers/admin/v4/sendWarning')
const v_sendWarning = require('../../../validations/admin/v4/sendWarning')
router.post('/warning', v_sendWarning, c_sendWarning)

//deleteWarning
const c_deleteWarning = require('../../../controllers/admin/v4/deleteWarning')
const v_deleteWarning = require('../../../validations/admin/v4/deleteWarning')
router.post('/dwarning', v_deleteWarning, c_deleteWarning)








//addAnalysis
const c_addAnalysis = require('../../../controllers/admin/v4/addAnalysis')
const v_addAnalysis = require('../../../validations/admin/v4/addAnalysis')
router.post('/addanalysis', adminToken, v_addAnalysis, c_addAnalysis)



//uploadimage newer
const c_analysisUpload = require('../../../controllers/admin/v4/analysisUpload')
router.post('/analysisup', uploadauth.single('image'), c_analysisUpload)


//testing add analysis with uploading image at the same time.if work fine remove  //!addanalysis  //analysisup
const c_addAnalysis2 = require('../../../controllers/admin/v4/addAnalysis2')
router.post('/addanalysis2', adminToken, uploadauth.single('image'), v_addAnalysis, c_addAnalysis2)

//closeAnalysis
const c_closeAnalysis = require('../../../controllers/admin/v4/closeAnalysis')
const v_closeAnalysis = require('../../../validations/admin/v4/closeAnalysis')
router.post('/closeanalysis', v_closeAnalysis, c_closeAnalysis)


//removeAnalysis
const c_removeAnalysis = require('../../../controllers/admin/v4/removeAnalysis')
router.post('/removeanalysis', v_closeAnalysis, c_removeAnalysis)





//Update extra description of signal
const c_updateExtraDesc = require('../../../controllers/admin/v4/updateextradesc')
const v_updateExtraDesc = require('../../../validations/admin/v4/updateextradesc')
router.post('/updateextradesc', adminToken, v_updateExtraDesc, c_updateExtraDesc)






module.exports = router





// //add a subscription for signal 
// const c_addSignalSubscription = require('../../../controllers/admin/v3/addSignalSub')
// const v_addSignalSubscription = require('../../../validations/admin/v3/addSignalSub')
// router.post('/addsgnsub', v_addSignalSubscription, c_addSignalSubscription)




//from v3 for update dollar price
// const c_updateSignalSubModel = require('../../../controllers/admin/v4/updateSignalSub')
// const v_updateSignalSubModel = require('../../../validations/admin/v4/updateSignalSub')
// router.post('/updatesgnsub', adminToken, v_updateSignalSubModel, c_updateSignalSubModel)