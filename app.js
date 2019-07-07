var express = require('express');
// var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose'); //שלב2
const passport = require('./passport/local'); //ספרייה של פספורט עם אסטרטגיה לוקל
const session = require("express-session");  //session גורם למשתמש להיות מחובר
const bodyParser = require("body-parser");

//  שלב1
var userRoutes = require('./routes/userRoutes');
var productRouts = require('./routes/productRoutes');
var cartRouts = require('./routes/cartRoutes');
var cartProductRouts = require('./routes/cartProductRoutes');
var orderRouts = require('./routes/orderRouts');
var app = express();
mongoose.connect('mongodb://localhost:27017/supermarket', { useNewUrlParser: true }) //שלב2  חיבור לדאטהבייס //collections


//middleware
app.use(logger('dev'));
app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ //middleware ->app.use is when we use middleware
    secret: 'noasoftwerdeveloper',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());  //איתחול פספורט
app.use(passport.session());   //כדי שיוכל להשתמש

app.use('/api/user', userRoutes);   //  שלב1
app.use('/api/product', productRouts);
app.use('/api/cart', cartRouts);
app.use('/api/cartProduct', cartProductRouts);
app.use('/api/order', orderRouts);
app.use('/api/assets', express.static('uploads')); // route foe serving server asset files

module.exports = app;
