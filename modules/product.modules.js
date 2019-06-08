var ProductModel = require('../models/product')

var productModel = {
    addNewPorduct: function (productObj) {
        let product = new ProductModel(productObj);
        return product.save();
    },
    getAll: async function () {
        return await ProductModel.find().populate('category').exec().then(newObj => {
            return newObj;
        });
    },
    getPorductById: function (id) {
        return ProductModel.findById(id);
    },
    getPorductByCategory: async function (categoryName) {
        const res =  await ProductModel.find().populate({path: 'category', match: {categoryName: categoryName}}).exec().then(newObj => {
            return newObj;
        });
        return res.filter(item => {
            return item.category !== null;
        })

    }

}


module.exports = productModel;

