function fcmSend(title, body) {
    console.log('notif has sent')
    var FCM = require('fcm-node');
    var serverKey = 'AAAAmqUHQvA:APA91bGRJnPt2CV5J_p5o1e5jAdvrp6e9qhM9_eWXeaHiYFxnntoa2ubWjuKjj_jIW97g_SlQbXJj-OC0dFC2ZADX8wxMEtxAjUwL1nfVOUVNf_vO8XrDJtetqY5NMomYG_g3eGynNyv';
    var topic1 = '/topics/signal1';
    var fcm = new FCM(serverKey);
    var message = {
        to: topic1,
        notification: {
            title: title,
            body: body
        },
    };
    fcm.send(message, function (err, response) {
        if (err) { } else { }
    });
}


module.exports = { fcmSend };