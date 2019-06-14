var ProductModel = require('../models/product');
var CategoryModel = require('../models/category');

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
    getAllCategory() {
        return CategoryModel.find();
    },
    getPorductById: function (id) {
        return ProductModel.findById(id);
    },
    getPorductByCategory: async function (categoryName) {
        const res = await ProductModel.find().populate({ path: 'category', match: { categoryName: categoryName } }).exec().then(newObj => {
            return newObj;
        });
        return res.filter(item => {
            return item.category !== null;
        })

    },
    getPorductByPorductName: async function (porductName) {
        const res = await ProductModel.find({ ProductName: porductName }).populate({ path: 'category' }).exec().then(newObj => {
            return newObj;
        });
        return res;
    },
    getPorductByID: async function (ID) {
        const res = await ProductModel.find({ _id: ID }).populate({ path: 'category' }).exec().then(newObj => {
            return newObj;
        });
        return res;
    },
    updateProduct: async function (newProduct) {
        debugger
        let product = await ProductModel.findByIdAndUpdate({ _id: newProduct._id}, newProduct);
        debugger;
        return product
        // let product = await ProductModel.findById(newProduct._id);
        // product.porductName = newProduct.porductName;
        // return product.save();  
    }


}


module.exports = productModel;

