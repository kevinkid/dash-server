﻿var express = require('express');
var app = express();
var http = require('http');
var fs = require("fs");
var path = require('path');
var config = fs.readFileSync('./settings.json', 'UTF-8');// @todo: Debug json parsing and use it for storing credentails 
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var routes = require("./routes/index");
var listen = require("./routes/listen");
var logger = require("morgan");
//var signalr = require("signalrjs");
var singlar = require("./Handlers/SocketHandler-signalr/lib/signalRJS.js");
var signalR = signalr();


var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env === 'development';

// Express cors config 
app.use(function (req, res, next) {
    req.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Origin", "https://dashdesk.azurewebsites.net");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "false");
    res.header("Origin, Content-Type, Access-Control-Allow-Credentials, Access-Control-Allow-Headers");
    next();
});


// SignalR config 
signalR.serverProperties.ProtocalVersion = 1.3; // @note: version should corespond with the client singalr protocal version .


// Port config 
//app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Routes config 
app.use('/', routes);
app.use('/listen', listen);

// Capture 404 errors 
app.use(function (req, res, next) {
    var error = new error('Not Found ');
    error.status = 404;
    next(error);
});


// Error Handling  
if (app.get("env") === "development" ) {
    app.use(function (err, req, res) {
        res.render("error", {
            message: err.message,
            error: err,
            title:  "Error"
        }); 
    });
}

signalR.hub('MyHub', {
    Send: function (name, message) {
        //@note: This method shoudl corespond with the client method calls 
        this.Clients.all.invoke('AddMessage').withArgs([name, message]);
        console.dir("Message recieved :" + message);
    }
});

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


module.exports = app;
