var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')  //שלב2

//  שלב1
var userRoutes = require('./routes/userRoutes');   
// var shoppingCartRoutes = require('./routes/userRoutes');   
// var userRoutes = require('./routes/userRoutes');   
// var userRoutes = require('./routes/userRoutes');   
// var userRoutes = require('./routes/userRoutes');   
// var userRoutes = require('./routes/userRoutes');   

var app = express();
mongoose.connect('mongodb://localhost:27017/supermarket', {useNewUrlParser: true}) //שלב2 //my_cars חיבור לדאטהבייס //collections

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/supermarket', userRoutes);   //  שלב1

module.exports = app;
