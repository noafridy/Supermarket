var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose'); //שלב2
const passport = require('./passport/local');
const session = require("express-session");
const bodyParser = require("body-parser");


//  שלב1
var userRoutes = require('./routes/userRoutes');
// var shoppingCartRoutes = require('./routes/userRoutes');   
// var userRoutes = require('./routes/userRoutes');   
// var userRoutes = require('./routes/userRoutes');   
// var userRoutes = require('./routes/userRoutes');   
// var userRoutes = require('./routes/userRoutes');   

var app = express();
mongoose.connect('mongodb://localhost:27017/supermarket', { useNewUrlParser: true }) //שלב2  חיבור לדאטהבייס //collections

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.use('/api/user', userRoutes);   //  שלב1


module.exports = app;
