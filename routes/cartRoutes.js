const express = require('express');
const router = express.Router();
//שלב 4- יוצרת משתנה למודל כדי שאשתמש בו
const CartModule = require('../modules/cart.module');
const OrderModel = require('../modules/order.module');
const CartProductModel = require('../modules/cartProduct.module');


// add new cart for customer
router.get('/:userId', async (req, res, next) => {
    const user = req.params.userId;
    const date = (new Date()).toISOString();
    try {
        // Get last shoppingCart for a user <x> use date field
        let LastShoppingcart = await CartModule.getLastShoppingCart(user);
        if (LastShoppingcart) {
            const userOrder = await OrderModel.getUserOrders(user, LastShoppingcart.id);
            if (userOrder) {
                CartModule.addNewShoppingCart({user, date}); // create a new cart for the user
                res.status(200).json({
                    message: 'found last order',
                    lastOrder: userOrder,
                    cart:[],
                    cartId: LastShoppingcart.id
                });
            } else {
                // get all cart products connected to current open cart
                const cartProducts = await CartProductModel.getAllCartProduct(LastShoppingcart.id);
                // send open cart
                res.status(200).json({
                    message: 'you have an open cart',
                    cart: cartProducts,
                    cartId: LastShoppingcart.id
                });
            }
        }
        
        // todo return the actual shopping cart with all the products related to it
        //res.json(LastShoppingcart);
    } catch (e) {
        if (e.message === 'userId is not defined') {
            CartModule.addNewShoppingCart({user, date}); // create a new cart for the user
            res.status(200).json({
                message: 'welcome to your first shopping',
                cart: [],
                cartId: LastShoppingcart.id
            });
        } else {
            res.status(404).send("Erorr : " + e);
        }
    }
});

// get last shoppingCart for a user <x> use date field
router.get('/last/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        let Shoppingcart = await CartModule.getLastShoppingCart(userId);
        res.json(Shoppingcart);
        
    } catch (e) {
        res.status(404).send("Erorr : " + e);
    }
});


module.exports = router;