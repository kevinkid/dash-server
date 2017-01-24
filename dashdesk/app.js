﻿
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var favicon = require('serve-favicon');
var newroutes = require("./routes/index");
var listen = require("./routes/listen");
var logger = require("morgan");


var app = express();


var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env === 'development';



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', newroutes);
app.use('/listen', listen);

// capture 404 errors 
app.use(function (req, res, next) {
    var error = new error('Not Found ');
    error.status = 404;
    next(error);
});


// error handling 
if (app.get("env") === "development" ) {
    app.use(function (err, req, res) {
        res.render("error", {
            message: err.message,
            error: err,
            title:  "Error"
        }); 
    });
}


// production error handling 
app.use(function (err, req, res) {
   
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: "Error"
    });
});


//http.createServer(app).listen(app.get('port'), function () {
//    console.log('Express server listening on port ' + app.get('port'));
//});

app.listen(process.env.PORT, '0.0.0.0', function (err) {
    console.log('Express server listening on port ' + app.get('port'));
});



module.exports = app;
