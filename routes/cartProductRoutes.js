var express = require('express');
var router = express.Router();
//שלב 4- יוצרת משתנה למודל כדי שאשתמש בו
var CartProductModule = require('../modules/cartProduct.module');

// add new or update cart product
router.post('/', async (req, res) => {
    try {
        const productId = req.body.product;
        const cartId = req.body.ShoppingCart;
        let cartProduct = '';

        // check if that product already exists in that cart id
        const cartproduct = await CartProductModule.checkCartProduct(cartId, productId);
        if (cartproduct) {
            cartProduct = await CartProductModule.updateCartProduct(req.body, cartproduct.id);
        } else {
            cartProduct = await CartProductModule.addNewCartPorduct(req.body);
        }
        
        res.json(cartProduct);
    } catch (e) {
        res.status(404).send("Erorr : " + e);
    }
});

// delete cart product
router.delete('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        await CartProductModule.deleteCartProduct(productId);
        res.json({message: 'product removed from cart'}).status(200);
    } catch (e) {
        res.status(404).send("Erorr : " + e);
    }
});

// delete cart product
router.delete('/all/:shoppingCartId', async (req, res) => {
    try {
        const shoppingCartId = req.params.shoppingCartId;
        await CartProductModule.deleteAllCartProducts(shoppingCartId);
        res.json({message: 'deleted all products from cart'}).status(200);
    } catch (e) {
        res.status(404).send("Erorr : " + e);
    }
});

// update cart product
// router.put('/', async (req, res) => {
//     try {
//         const newProductCart = req.body;
//         await CartProductModule.updateCartProduct(newProductCart);
//         res.send("update");
//     } catch (e) {
//         res.status(404).send("Erorr : " + e);
//     }
// });

// get all cart product by cart id
router.get('/:cartId', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const cartProducts = await CartProductModule.getAllCartProduct(cartId);
        res.send(cartProducts);
    } catch (e) {
        res.status(404).send("Erorr : " + e);
    }
});

module.exports = router;