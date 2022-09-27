const signalSchema = require('../../../models/signal')
const traderSchema = require('../../../models/trader')
const randomInt = require('random-int');//added new 
const singalsubModel = require('../../../models/signalSubscription')//added new 
var symbol_img;
var leverage;
var l_or_s;
var market_type;
module.exports = (req, res) => {
    traderSchema.findOne({ username: req.body.trader.toLowerCase() }, (err, response) => {
        if (err) {
            return res.json({ message: err, status: 0 })
        }
        else {
            if (response == null) {
                return res.json({ message: 'trader not found', status: 0 })
            }
            else {
                new Promise(function (resolve) {
                    if (req.body.symbol_img) {
                        resolve(symbol_img = "https://bitrogen.liara.run/public/upload/" + req.body.symbol_img.toLowerCase() + ".png")
                    } else {
                        resolve(symbol_img = null)
                    }
                }).then(() => {
                    new Promise((resolve) => {
                        if (req.body.market_type == 'futures') {
                            if (req.body.leverage) {
                                resolve(leverage = req.body.leverage)
                            } else {
                                resolve(leverage = 2)
                            }
                        } else {
                            resolve(leverage = null)
                        }
                    })
                }).then(() => {
                    new Promise((resolve) => {
                        if (req.body.market_type == 'futures') {
                            market_type = 'futures'
                            if (req.body.l_or_s) {
                                if (req.body.l_or_s == 'long' || req.body.l_or_s == 'short') {
                                    resolve(l_or_s = req.body.l_or_s)
                                } else {
                                    resolve(l_or_s = null)
                                }
                            } else {
                                resolve(l_or_s = null)
                            }
                        } else {
                            l_or_s = null
                            resolve(market_type = 'spot')
                        }
                    })
                }).then(() => {
                    var JDate = require('jalali-date');
                    var jdate = new JDate;
                    const today = jdate.format('dddd DD MMMM YYYY')
                    //! here has changed 
                    const clock = req.body.clock + ' - ' + today
                    let takeprofitArr = req.body.takeprofit
                    takeprofitArr = takeprofitArr.replace('[', '');
                    takeprofitArr = takeprofitArr.replace(']', '');
                    takeprofitArr = takeprofitArr.split(',');
                    takeprofitArr = JSON.parse(
                        JSON.stringify(takeprofitArr).replace(/ /g, "")
                    )
                    const zone = req.body.start_zone + ' to ' + req.body.end_zone//new
                    if (req.body.extradesc == 'null') {//new
                        req.body.extradesc = null
                    }
                    signalSchema({
                        vip: req.body.vip,
                        trader: req.body.trader.toLowerCase(),
                        symbol_name: req.body.symbol_name.toUpperCase(),
                        symbol_img: symbol_img.toLowerCase(),
                        star: req.body.star,
                        market_type: market_type,
                        leverage: leverage,
                        l_or_s: l_or_s,
                        zone: zone,
                        takeprofit: takeprofitArr,
                        stoploss: req.body.stoploss,
                        exchange: 'Binance',
                        clock: clock,
                        extradesc: req.body.extradesc
                    }).save(function (err, result) {
                        if (err) {
                            return res.json({ message: err, status: 0 })
                        }
                        else {
                            fcmSend()
                            getVipPhone()
                            return res.json({ result, status: 1 })
                        }
                    })
                })
            }
        }
    })

    function fcmSend() {
        var FCM = require('fcm-node');
        var serverKey = 'AAAAmqUHQvA:APA91bGRJnPt2CV5J_p5o1e5jAdvrp6e9qhM9_eWXeaHiYFxnntoa2ubWjuKjj_jIW97g_SlQbXJj-OC0dFC2ZADX8wxMEtxAjUwL1nfVOUVNf_vO8XrDJtetqY5NMomYG_g3eGynNyv';
        var topic1 = '/topics/signal1';
        var fcm = new FCM(serverKey);
        let setMarket;
        if (market_type == 'spot') {
            setMarket = 'اسپات'
        } else {
            setMarket = 'فیوچرز'
        }
        var message = {
            to: topic1,  // either DeviceRegistrationToken or topic1
            notification: {
                title: `بیتروژن`,
                body: `سیگنال جدید ${setMarket}`
            },
        };
        fcm.send(message, function (err, response) {
            if (err) {
                // console.log(err);
            } else {
                // console.log("Successfully sent with response: ", response);
            }
        });
    }


    //added new 
    function getVipPhone() {
        let code = randomInt(1000, 10000);
        singalsubModel.paginate({ paied: true }, { populate: ["user"] }).then((result) => {
            var i;
            var text = '';
            for (i = 0; i < result.docs.length; i++) {
                text = text + result.docs[i].user.phone + ','
            }
            text = text.slice(0, -1);
            sendSms_Otp(text, code)
        })
    }

    //added new 
    function sendSms_Otp(phones, code) {
        var request = require("request");
        var options = {
            method: 'POST',
            url: 'https://api.ghasedak.me/v2/verification/send/simple',
            headers:
            {
                'cache-control': 'no-cache',
                apikey: '75e790b0f46328a332d92d15b218b9f32c837856e42d221baf28ed762c80a062',
                'content-type': 'application/x-www-form-urlencoded'
            },
            form:
            {
                receptor: phones,
                template: 'signal',
                type: '1',
                param1: code
            }
        };
        request(options, function (error, response, body) { });
    }
}