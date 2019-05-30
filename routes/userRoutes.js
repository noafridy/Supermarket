var express = require('express');
var router = express.Router();
//שלב 4- יוצרת משתנה למודל כדי שאשתמש בו
var userModule = require('../modules/user.modules');
const passport = require('../passport/local');

// var shoppingCartModel = require('../models/user');
// var ProductModel = require('../models/user');  
// var OrderModel = require('../models/user');  
// var ItemModel = require('../models/user');  
// var CategoryModel = require('../models/user'); 


router.get('/', async (req, res, next) => {
  try {
    const result = await userModule.getAll();
    res.send(result);
  } catch (e) {    //e its erorr
    res.status(404).send("Erorr : " + e);
  }
});

// add new user
router.post('/', async (req, res, next) => {
  try {
    let user = await userModule.addNew(req.body);
    res.json(user);
    // res.json({ data: user });
  } catch (e) {
    res.status(404).send("Erorr : " + e);
  }
});

//login
router.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    debugger;

    if (req.user) {
      // login success
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      res.redirect('/users/' + req.user.username);
    } else {
      res.redirect('/login');
    }
  });

module.exports = router;
