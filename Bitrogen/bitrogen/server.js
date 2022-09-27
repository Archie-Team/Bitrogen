//atom one dark
//min dark
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const expressvalidator = require('express-validator')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

global.config = require('././config')
global.reqErrors = require('./validations/reqErrors')

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json({ type: 'application/json' }))//1.19.0
app.use(expressvalidator())
app.use('/public', express.static('public'))
app.use('/', express.static('app'))
app.use(express.static('./public'))
app.use(cors())

// //enable api routers
const api_router = require('./routes/api/index')
app.use('/api', api_router)



const web_Router = require('./routes/web/web')
app.use('/page', web_Router)




connectMongo('local')
runServer()
// app.listen(4000)
mongoose.connection.on('open', function () {
    console.log('Bitrogen databse connected')
})




function connectMongo(where) {
    mongoose.set('useCreateIndex', true)
    if (where == 'local') {
        mongoose.connect('mongodb://127.0.0.1:27017/bitrogen', { useUnifiedTopology: true, useNewUrlParser: true })
    } else {
        mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            authSource: 'admin',
            useUnifiedTopology: true
        })
    }
}





function runServer() {
    var cluster = require('cluster');
    if (cluster.isMaster) {
        var numWorkers = require('os').cpus().length;
        console.log('Master cluster setting up ' + numWorkers + ' workers...');
        for (var i = 0; i < numWorkers; i++) {
            cluster.fork();
        }
        cluster.on('online', function (worker) {
        });
        cluster.on('exit', function (worker, code, signal) {
            cluster.fork();
        });
    } else {
        app.all('/*', function (req, res) { res.send('process ' + process.pid + ' says hello!').end(); })
        var server = app.listen(process.env.PORT, function () {// console.log('Process ' + process.pid + ' is listening to all incoming requests');
        });
    }




    //liara config
    process.on('unhandledRejection', error => {
        console.error('unhandledRejection', error);
        process.exit(1);
    });


    
    io = require('socket.io')(server)
    io.on('connection', function (Socket) {
        Socket.on('send', function (arg, ack) {
            if (ack) {
                ack('sgn');
            }
            Socket.broadcast.emit("signal", "new signal")
        });
        Socket.on('disconnect', () => {
        })
    })

}



