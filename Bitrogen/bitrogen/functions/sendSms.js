function smsSend(phone, code, template) {
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
            receptor: phone,
            template: template,
            type: '1',
            param1: code
        }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        // console.log(body);
    });
}


module.exports = { smsSend };