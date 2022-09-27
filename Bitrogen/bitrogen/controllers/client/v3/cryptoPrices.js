const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: 'puOtSIM6WL3ARAtwhwf8Ye8A183POlfCfvHoUWlaQzOQGHRsVcYWlg0wPAElgAgr',
    APISECRET: 'PhlmzXki7MHmp7Bq8DoHD0Zlq1xahKwUNreaM1k2984In0gO889BWCWi20i0nY3P',
})
module.exports = (req, res) => {
    runBinance()
    async function runBinance() {
        try {
            let ticker = await binance.prices();
            const imageUrl = 'https://bitrogen.liara.run/public/upload/'
            let curencies = [{ price: ticker.BTCUSDT, name: 'BTC', mainName: 'Bitcoin', symbolImage: imageUrl + 'btc' + '.png' },
            { price: ticker.ETHUSDT, name: 'ETH', mainName: 'Ethereum', symbolImage: imageUrl + 'eth' + '.png' },
            { price: ticker.DOGEUSDT, name: 'DOGE', mainName: 'Doge Coin', symbolImage: imageUrl + 'doge' + '.png' },
            { price: ticker.BNBUSDT, name: 'BNB', mainName: 'Binance Coin', symbolImage: imageUrl + 'bnb' + '.png' },
            { price: ticker.LTCUSDT, name: 'LTC', mainName: 'Lite Coin', symbolImage: imageUrl + 'ltc' + '.png' },
            { price: ticker.ADAUSDT, name: 'ADA', mainName: 'Cardano', symbolImage: imageUrl + 'ada' + '.png' },
            { price: ticker.XRPUSDT, name: 'XRP', mainName: 'Ripple', symbolImage: imageUrl + 'xrp' + '.png' },
            { price: ticker.NEOUSDT, name: 'NEO', mainName: 'Neo', symbolImage: imageUrl + 'neo' + '.png' },
            { price: ticker.ATOMUSDT, name: 'ATOM', mainName: 'Cosmos', symbolImage: imageUrl + 'atom' + '.png' },
            { price: ticker.XLMUSDT, name: 'XLM', mainName: 'Stellar', symbolImage: imageUrl + 'xlm' + '.png' },
            { price: ticker.XTZUSDT, name: 'XTZ', mainName: 'Tezos', symbolImage: imageUrl + 'xtz' + '.png' },
            { price: ticker.TRXUSDT, name: 'TRX', mainName: 'Tron', symbolImage: imageUrl + 'trx' + '.png' },
            { price: ticker.EOSUSDT, name: 'EOS', mainName: 'Eos', symbolImage: imageUrl + 'eos' + '.png' },
            { price: ticker.DOTUSDT, name: 'DOT', mainName: 'Polkadot', symbolImage: imageUrl + 'dot' + '.png' },
            { price: ticker.ICPUSDT, name: 'ICP', mainName: 'Internet Computer', symbolImage: imageUrl + 'icp' + '.png' },
            { price: ticker.SOLUSDT, name: 'SOL', mainName: 'Solana', symbolImage: imageUrl + 'sol' + '.png' },
            { price: ticker.FILUSDT, name: 'FIL', mainName: 'File Coin', symbolImage: imageUrl + 'fil' + '.png' },
            { price: ticker.VETUSDT, name: 'VET', mainName: 'VeChain', symbolImage: imageUrl + 'vet' + '.png' },
            { price: ticker.AVAXUSDT, name: 'AVAX', mainName: 'Avalanche', symbolImage: imageUrl + 'avax' + '.png' },
            { price: ticker.KSMUSDT, name: 'KSM', mainName: 'Kusama', symbolImage: imageUrl + 'ksm' + '.png' },
            { price: ticker.NEARUSDT, name: 'NEAR', mainName: 'Near Protocol', symbolImage: imageUrl + 'near' + '.png' },
            { price: ticker.HBARUSDT, name: 'HBAR', mainName: 'Hedera Hashgraph', symbolImage: imageUrl + 'hbar' + '.png' },
            { price: ticker.RUNEUSDT, name: 'RUNE', mainName: 'ThorChain', symbolImage: imageUrl + 'rune' + '.png' },
            { price: ticker.XEMUSDT, name: 'XEM', mainName: 'Nem', symbolImage: imageUrl + 'xem' + '.png' },
            { price: ticker.LINKUSDT, name: 'LINK', mainName: 'ChainLink', symbolImage: imageUrl + 'link' + '.png' },
            { price: ticker.MATICUSDT, name: 'MATIC', mainName: 'Polygon', symbolImage: imageUrl + 'matic' + '.png' },
            { price: ticker.THETAUSDT, name: 'THETA', mainName: 'Theta', symbolImage: imageUrl + 'theta' + '.png' },
            { price: ticker.UNIUSDT, name: 'UNI', mainName: 'UniSwap', symbolImage: imageUrl + 'uni' + '.png' },
            { price: ticker.DAIUSDT, name: 'DAI', mainName: 'Dai', symbolImage: imageUrl + 'dai' + '.png' },
            { price: ticker.AAVEUSDT, name: 'AAVE', mainName: 'Aave', symbolImage: imageUrl + 'aave' + '.png' },
            { price: ticker.MKRUSDT, name: 'MKR', mainName: 'Maker', symbolImage: imageUrl + 'mkr' + '.png' },
            ];
            return res.json({ curencies, status: 1 })
        } catch (er) {
            return res.json({
                message: 'خطا در دریافت قیمت ارزها',
                status: 0
            })
        }
    }

}



















        // console.info(`Price of BTCUSDT: ${ticker.BTCUSDT}`);
        // console.info(`Price of ETHUSDT: ${ticker.ETHUSDT}`);
        // console.info(`Price of BNBUSDT: ${ticker.BNBUSDT}`);
        // console.info(`Price of DOGEUSDT: ${ticker.DOGEUSDT}`);
        // console.info(`Price of DOGEUSDT: ${ticker.LTCUSDT}`);
        // console.info(`Price of DOGEUSDT: ${ticker.ADAUSDT}`);
        // console.info(`Price of DOGEUSDT: ${ticker.XRPUSDT}`);
        // console.info(`Price of DOGEUSDT: ${ticker.NEOUSDT}`);
        // console.info(`Price of DOGEUSDT: ${ticker.ATOMUSDT}`);
        // console.info(`Price of DOGEUSDT: ${ticker.XLMUSDT}`);
        // console.info(`Price of DOGEUSDT: ${ticker.XTZUSDT}`);
        // console.info(`Price of DOGEUSDT: ${ticker.TRXUSDT}`);
        // console.info(`Price of DOGEUSDT: ${ticker.EOSUSDT}`);



        // console.info(`Price of DOTUSDT: ${ticker.DOTUSDT}`);
        // console.info(`Price of ICPUSDT: ${ticker.ICPUSDT}`);
        // console.info(`Price of SOLUSDT: ${ticker.SOLUSDT}`);
        // console.info(`Price of FILUSDT: ${ticker.FILUSDT}`);
        // console.info(`Price of VETUSDT: ${ticker.VETUSDT}`);
        // console.info(`Price of AVAXUSDT: ${ticker.AVAXUSDT}`);
        // console.info(`Price of KSMUSDT: ${ticker.KSMUSDT}`);
        // console.info(`Price of NEARUSDT: ${ticker.NEARUSDT}`);
        // console.info(`Price of HBARUSDT: ${ticker.HBARUSDT}`);
        // console.info(`Price of RUNEUSDT: ${ticker.RUNEUSDT}`);
        // console.info(`Price of XEMUSDT: ${ticker.XEMUSDT}`);

        // console.info(`Price of XEMUSDT: ${ticker.LINKUSDT}`);
        // console.info(`Price of XEMUSDT: ${ticker.MATICUSDT}`);
        // console.info(`Price of XEMUSDT: ${ticker.THETAUSDT}`);
        // console.info(`Price of XEMUSDT: ${ticker.UNIUSDT}`);
        // console.info(`Price of XEMUSDT: ${ticker.DAIUSDT}`);
        // console.info(`Price of XEMUSDT: ${ticker.AAVEUSDT}`);
        // console.info(`Price of XEMUSDT: ${ticker.MKRUSDT}`);
