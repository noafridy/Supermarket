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
    updateCartProduct: async function (newProductObj) {
        let product = await CartProductModel.findByIdAndUpdate({_id:newProductObj._id},newProductObj);
        return product.save;
    },
    getAllCartProduct: async function (cartId) {
        const res = await CartProductModel.find({ShoppingCart: cartId}).populate({ path: 'product' }).exec().then(data => {
            return data;
        });
        return res;
    }
}

module.exports = cartProductModel;