var CartProductModel = require('../models/cartProduct');

var cartProductModel = {
    addNewCartPorduct: function (productObj) {
        let cartProduct = new CartProductModel(productObj);
        return cartProduct.save();
    },
    deleteCartProduct: async function (id) {
        await CartProductModel.findByIdAndDelete(id);
        return await CartProductModel.find();
    },
    deleteAllCartProducts: async function (shoppingId) {
        await CartProductModel.deleteMany({ShoppingCart: shoppingId});
    },
    updateCartProduct: async function (newProductObj, cartItemId) {
        let product = await CartProductModel.findByIdAndUpdate({_id:cartItemId}, newProductObj);
        return product.save;
    },
    getAllCartProduct: async function (cartId) {
        const res = await CartProductModel.find({ShoppingCart: cartId}).populate('product').populate('ShoppingCart').exec().then(data => {
            return data;
        });
        return res;
    },
    checkCartProduct: async function (cartId, productId) {
        const res = await CartProductModel.findOne({ShoppingCart: cartId, product: productId});
        return res;
    }
}

module.exports = cartProductModel;