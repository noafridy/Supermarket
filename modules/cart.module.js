var ShoppingCartModel = require('../models/shoppingCart');

var cartModel = {
    addNewShoppingCart: function(obj) {
        let shoppingCart = new ShoppingCartModel(obj);
        return shoppingCart.save();
    },
    getLastShoppingCart: async function(userId) {
        return await ShoppingCartModel.findOne({user: userId}, {}, { sort: { 'date' : -1 } });
    }
   
}

module.exports = cartModel;