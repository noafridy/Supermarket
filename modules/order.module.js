var OrderModel = require('../models/order');

var orderModel = {
    addOrder: function(obj) {
        let order = new OrderModel(obj);
        return order.save();
    },
    getUserOrders: async function(userId, cartId) {
        const order =  await OrderModel.findOne({user: userId, ShoppingCart: cartId});
        debugger;
        return order;
    }
}

module.exports = orderModel;