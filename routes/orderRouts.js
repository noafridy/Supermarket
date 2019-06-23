var express = require('express');
var router = express.Router();
var orderModule = require('../modules/order.module');

// add new order
router.post('/', async (req, res, next) => {
    try {
        let order = await orderModule.addOrder(req.body);
        res.json(order);
    } catch (e) {
        res.status(404).send("Erorr : " + e);
    }
});

router.get('/:userId/:cartId', async (req, res, next) => {
    const {
        userId, 
        cartId
    } = req.params;

    try {
        let orders = await orderModule.getUserOrders(userId,cartId);
        res.json(orders);
    } catch (e) {
        res.status(404).send("Erorr : " + e);
    }
});

module.exports = router;