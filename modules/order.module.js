var OrderModel = require('../models/order');
var CartProductModel = require('../models/cartProduct');
var CartProductModule = require('./cartProduct.module');

var orderModel = {
    addOrder: function(obj) {
        let order = new OrderModel(obj);
        return order.save();
    },
    getUserOrders: async function(userId, cartId) {
        const order =  await OrderModel.findOne({user: userId, ShoppingCart: cartId});
        return order;
    },
    getProductsByOrderId: async function(orderId) {
        const order =  await OrderModel.findOne({_id: orderId}).populate({ path: 'ShoppingCart' }).exec().then(data => {
            return data;
        });

        if (!order) {
            return [];
        }


        const products =  await CartProductModule.getAllCartProduct(order.ShoppingCart.id);
        return {order, products};
    },
    getOrdersWithDate: async function(dateNumber) {
        const orders =  await OrderModel.find({DD: dateNumber});
        return orders;
    }
}

module.exports = orderModel;