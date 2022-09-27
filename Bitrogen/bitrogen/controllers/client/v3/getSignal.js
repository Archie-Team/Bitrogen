const signalSchema = require('../../../models/signal')
var JDate = require('jalali-date');
var query;
module.exports = (req, res) => {
    new Promise(function (resolve) {
        if (req.body.signal_type == 0) {
            resolve(query = {
                $or: [{ signal_type: 0 }, { signal_type: 2 }], market_type: req.body.market_type
            })
        }
        else {
            resolve(query = { signal_type: 1, market_type: req.body.market_type })
        }
    }).then(() => {
        let options = { page: Number(req.body.page), limit: 200, sort: { createdAt: -1 } }//createdAt has changed 13.2.1400
        var jdate = new JDate;
        var today = jdate.format('dddd DD MMMM YYYY')
        today = ' ' + today
        signalSchema.paginate(query, options).then((result) => {
            if (result.docs.length == 0) {

                return res.json({ message: 'سیگنالی در حال حاضر وجود ندارد', status: 2 })
            }

            if (query.signal_type == 1) {
                if (req.paied == false) {
                    result.docs.forEach(function (entry) {
                        if (entry.vip == true) {
                            entry.zone = null
                            entry.stoploss = null
                            entry.takeprofit = null
                            entry.l_or_s = null
                            entry.market_type = null
                            entry.leverage = null
                            entry.extradesc = null
                            entry.symbol_name = null
                            entry.symbol_img = null
                            entry.extraimg = null
                            entry.extradesc = null
                        }
                    });
                }
            }

            result.docs.forEach(function (each) {
                var str = each.clock
                str = str.substring(str.indexOf("-") + 1);
                if (str == today) {
                    each.clock = 'امروز'
                }
            })

            return res.json({
                'total': result.total,
                'page': result.page,
                'pages': result.pages,
                'status': 1, result: result.docs
            })
        })
    })
}