var express = require('express');
var router = express.Router();
var orderModule = require('../modules/order.module');

// add new order
router.post('/', async (req, res, next) => {
    debugger;
    let currentDate = (new Date()).toISOString().substr(0, 10);
    let obj = { ...req.body };
    obj.orderDate = currentDate;

    try {
        let ordersFound = await orderModule.getOrdersWithDate(req.body.DD);
        if (ordersFound.length < 3) {
            let order = await orderModule.addOrder(obj);
            res.json(order);
        } else {
            res.json({ error: 'plese select another date, all deliveries are taken for this date' });
        }

    } catch (e) {
        res.status(404).send("Erorr : " + e);
    }
});

router.get('/recipt/:orderId', async (req, res, next) => {
    const {order, products} = await orderModule.getProductsByOrderId(req.params.orderId);
    let str = '######## Recipt #########\n\n';
    let totalCost = 0;
    products.forEach(p => {
        str += `${p.quantity} X ${p.product.ProductName}\n`;
        totalCost += p.totalCost;
    });

    str += `\n\nDelivery date: ${order.DD}`;

    str += `\n\nTotalCost: ${totalCost}`;

    res.set({"Content-Disposition":"attachment; filename=receipt"});
    res.send(str);
})

module.exports = router;