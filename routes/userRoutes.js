var express = require('express');
var router = express.Router();
//שלב 4- יוצרת משתנה למודל כדי שאשתמש בו
var userModule = require('../modules/user.modules');
const passport = require('../passport/local');


router.get('/', async (req, res, next) => {
  try {
    const result = await userModule.getAll();
    res.send(result);
  } catch (e) {    //e its erorr
    res.status(404).send("Erorr : " + e);
  }
});


router.post('/login', function (req, res, next) {  //function עוטפת
  try {
    passport.authenticate('local', function (err, user, info) { //authenticate ברגע שמגיעה בקשת לןגין הוא הולך למידלור שהגדרתי
      if (err) { return next(err); }
      if (!user) { return res.status(200).send({ errorMessage: info.message }); }  //אם אין יוזר תשלח הודעה כגיסון
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        res.cookie('userInfo', req.user._id, { maxAge: 900000, httpOnly: true });  //מכניסים לקוקי את האנפרומציה של היוזר
        return res.status(200).send({
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          role: req.user.role,
          street: req.user.street,
          city: req.user.city,
          _id: req.user._id
        });
      });
    })(req, res, next);
  } catch (e) {    //e its erorr
    res.status(404).send("Erorr : " + e);
  }
});

//check If ID Exist in the system
router.get('/checkUser/:ID', async (req, res, next) => {
  const ID = req.params.ID
  try {
    const result = await userModule.checkIfExistID(ID);
    // await userModule.checkIfExistID(ID);
    if (result) {
      res.status(200).json(
        { 
          msg: 'The user exist in the system, please try login',
          code: 404
      });
    } else {
      res.status(200).json({msg:'OK', code: 200});
    }
  } catch (e) {    //e its erorr
    res.status(200).json({msg:  'error',code: 404});
  }
});

// add new user
router.post('/join', function (req, res, next) {  //function עוטפת

  try {
    passport.authenticate('local-signup', function (err, user, info) { //authenticate ברגע שמגיעה בקשת לןגין הוא הולך למידלור שהגדרתי
      if (err) { return next(err); }
      if (!user) { return res.status(200).send({ errorMessage: info.message }); }  //אם אין יוזר תשלח הודעה כגיסון
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        res.cookie('userInfo', req.user._id, { maxAge: 900000, httpOnly: true });  //מכניסים לקוקי את האנפרומציה של היוזר
        return res.status(200).send({
          firstName: req.user.firstName,
          username: req.user.username,
          lastName: req.user.lastName,
          role: req.user.role,
          street: req.user.street,
          city: req.user.city,
          _id: req.user._id
        });
      });
    })(req, res, next);
  } catch (e) {    //e its erorr
    res.status(404).send("Erorr : " + e);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    res.cookie('userInfo', null, { maxAge: 900000, httpOnly: true });
    req.session.destroy();
    req.logout();
    return res.status(200).send({ message: 'success' });
  } catch (e) {    //e its erorr
    res.status(404).send("Erorr : " + e);
  }
});

//update user role=admin
router.put('/', async (req, res, next) => {
  try {
    userModule.updateRole(req.body.id, req.body.role);
    return res.status(200).send({ message: 'success' });
  } catch (e) {    //e its erorr
    res.status(404).send("Erorr : " + e);
  }
})


module.exports = router;
