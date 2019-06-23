var express = require('express');
var router = express.Router();
//שלב 4- יוצרת משתנה למודל כדי שאשתמש בו
var CartProductModule = require('../modules/cartProduct.module');

// add new cart product
router.post('/', async (req, res) => {
    try {
        let cartProduct = await CartProductModule.addNewCartPorduct(req.body);
        res.json(cartProduct);
    } catch (e) {
        res.status(404).send("Erorr : " + e);
    }
});

// delete cart product
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let cartProduct = await CartProductModule.deleteCartProduct(id);
        res.json(cartProduct);
    } catch (e) {
        res.status(404).send("Erorr : " + e);
    }
});

// update cart product
router.put('/', async (req, res) => {
    try {
        debugger
        const newProductCart = req.body;
        await CartProductModule.updateCartProduct(newProductCart);
        res.send("update");
    } catch (e) {
        res.status(404).send("Erorr : " + e);
    }
});

// get all cart product by cart id
router.get('/:cartId', async (req, res) => {
    try {
        debugger;
        const cartId = req.params.cartId;
        const cartProducts = await CartProductModule.getAllCartProduct(cartId);
        res.send(cartProducts);
    } catch (e) {
        res.status(404).send("Erorr : " + e);
    }
});

module.exports = router;