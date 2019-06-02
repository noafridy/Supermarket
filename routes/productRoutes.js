var express = require('express');
var router = express.Router();
//שלב 4- יוצרת משתנה למודל כדי שאשתמש בו
var CategoryModel = require('../models/category'); 
var productModule = require('../modules/product.modules');

router.get('/', async (req, res, next) => {
    try {
        const result = await productModule.getAll();
        res.send(result);
    } catch (e) {    //e its erorr
        res.status(404).send("Erorr : " + e);
    }
});

// add new product
router.post('/', async (req, res, next) => {
    try {
        let user = await productModule.addNew(req.body);
        res.json(user);
        // res.json({ data: user });
    } catch (e) {
        res.status(404).send("Erorr : " + e);
    }
});

//add Category data
router.get('/addCategory', async function (req, res, next) {
    let x1 = new CategoryModel({ categoryName: "Milk&Eggs" })
    let x2 = new CategoryModel({ categoryName: "Vegetabler&Fruits" })
    let x3 = new CategoryModel({ categoryName: "Meat&Fish" })
    let x4 = new CategoryModel({ categoryName: "Wine&Drinks" })
    await x1.save();
    await x2.save();
    await x3.save();
    await x4.save();
    res.send("added");
});

module.exports = router;