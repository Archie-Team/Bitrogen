const signalSchema = require('../../../models/signal')
module.exports = (req, res) => {
    const query = {
        $or: [{ signal_type: 0 }, { signal_type: 2 }], market_type: req.body.market_type
    }

    let options = { page: 1, limit: 40, sort: { createdAt: -1 } }
    signalSchema.paginate(query, options).then((result) => {

        if (result.docs.length == 0) { return res.json({ message: 'سیگنالی در حال حاضر وجود ندارد', status: 2 }) }

        if (req.body.market_type == 'spot') {
            if (req.body.details_on == false) {
                let num = 0
                result.docs.forEach(element => {
                    num = num + element.profit
                });
                return res.json({
                    'page': result.page,
                    'total': result.total,
                    'pages': result.pages,
                    'status': 1,
                    'profit_lev0': num
                })
            }

            return res.json({
                'status': 1, result: result.docs,
            })

        }

        //its futures now
        if (req.body.details_on == false) {
            let num = 0
            result.docs.forEach(element => {
                console.log(element.profit)
                num = num + element.profit
            });
            return res.json({
                'page': result.page,
                'total': result.total,
                'pages': result.pages,
                'status': 1,
                'profit_lev5': num * 5,
                'profit_lev10': num * 10,
                'profit_lev20': num * 20,
            })
        }
        return res.json({
            'status': 1, result: result.docs,
        })

    })
}