var PorductModel = require('../models/product')

var porductModel = {
    addNew: function (userObj) {
        let product = new ProductModel(productObj);
        return product.save();
    },
    getAll: function () {
        return PorductModel.find();
    }

}


module.exports = porductModel;

