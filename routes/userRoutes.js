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
// router.post('/login',
//   passport.authenticate('local'),  
//   function (req, res) {  //אפשר לשרשר דברים שהוא יעשה בעזרת פיסיק

//     if (req.user) {  //בודק האם קיים יוזר בבקשה
//       // login success
//       // If this function gets called, authentication was successful.
//       // `req.user` contains the authenticated user.

//       // TODO change this address to the production one
//       res.status(200).send(req.user);      //redirect ניווט למסך אחר במקרה זה ניווט למסך יוזר'
//     } else {
//       res.status(200).send('error');
//     }
//   });


router.post('/login', function (req, res, next) {  //function עוטפת
  passport.authenticate('local', function (err, user, info) { //authenticate ברגע שמגיעה בקשת לןגין הוא הולך למידלור שהגדרתי
    if (err) { return next(err); }
    if (!user) { return res.status(200).send({ errorMessage: info.message }); }  //אם אין יוזר תשלח הודעה כגיסון
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      res.cookie('userInfo', req.user._id, { maxAge: 900000, httpOnly: true });  //מכניסים לקוקי את האנפרומציה של היוזר
      return res.status(200).send({
        firstName: req.user.firslName,
        lastName: req.user.lastName,
        rol: req.user.rol,
        street: req.user.street,
        city: req.user.city
      });
    });
  })(req, res, next);
});


router.post('/logout', async (req, res, next) => {
    debugger;
    res.cookie('userInfo', null, { maxAge: 900000, httpOnly: true });  //מכניסים לקוקי את האנפרומציה של היוזר
    return res.status(200).send({message: 'success'});
});

module.exports = router;
