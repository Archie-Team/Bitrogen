const rp = require('request-promise');
module.exports = (req, res) => {
    const requestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        qs: {
            'start': '1',
            'limit': '400',
            'convert': 'USD'
        },
        headers: {
            'X-CMC_PRO_API_KEY': '89da7f19-622a-445d-8b54-8f830ea93443'
        },
        json: true,
        gzip: true
    };

    rp(requestOptions).then(response => {
        let curencies = [];
        response.data.forEach(function (entry) {
            let crypto = {
                "name": entry.name,
                "symbol": entry.symbol,
                "cmc_rank": entry.cmc_rank,
                "chart": `https://www.tradingview.com/chart/?symbol=BINANCE%3A${entry.symbol.toUpperCase()}USDT`,
                "price": entry.quote.USD.price,
                "percent_change_24h": parseFloat((Math.round(entry.quote.USD.percent_change_24h * 100) / 100).toFixed(2)),
                "symbolImage": "https://bitrogen.liara.run/public/upload/" + entry.symbol.toLowerCase() + ".png"
            }
            curencies.push(crypto)
        });
        return res.json({
            status: 1,
            data: curencies
        })
    }).catch((err) => {
        return res.json({
            status: 0,
            message: 'خطا در دریافت ارز های برتر'
        })
    });
}