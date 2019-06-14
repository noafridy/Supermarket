var express = require('express');
var router = express.Router();
//שלב 4- יוצרת משתנה למודל כדי שאשתמש בו
var CategoryModel = require('../models/category');
var productModule = require('../modules/product.modules');

//get all CategoryModel
router.get('/category', async (req, res, next) => {
    try {
        const result = await productModule.getAllCategory();
        res.send(result);
    } catch (e) {    //e its erorr
        res.status(404).send("Erorr : " + e);
    }
});

//get all productModule
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
        let product = await productModule.addNewPorduct(req.body);
        res.json(product);
        // res.json({ data: user });
    } catch (e) {
        res.status(404).send("Erorr : " + e);
    }
});

//get products by category name
router.get('/:categoryName', async (req, res, next) => {
    try {
        const categoryName = req.params.categoryName;
        const result = await productModule.getPorductByCategory(categoryName);
        res.send(result);

    } catch (e) {    //e its erorr
        res.status(404).send("Erorr : " + e);
    }
});

//get products by product name
router.get('/name/:productName', async (req, res, next) => {
    try {
        const productName = req.params.productName;
        const result = await productModule.getPorductByPorductName(productName);
        res.send(result);

    } catch (e) {    //e its erorr
        res.status(404).send("Erorr : " + e);
    }
});

//get product by id
router.get('/id/:id', async (req, res) => {
    try {
        const ID = req.params.id;
        const result = await productModule.getPorductByID(ID);
        res.send(result);

    } catch (e) {    //e its erorr
        res.status(404).send("Erorr : " + e);
    }
});

//update product 
router.put('/', async (req, res) => {
    try {
        const newProduct = req.body;
        const result = await productModule.updateProduct(newProduct);
        res.send(result);
    } catch (e) {    //e its erorr
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