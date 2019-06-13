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
    getAllCategory(){
        return CategoryModel.find();
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

    },
    getPorductByPorductName: async function (porductName){
        var find = async function(porductName, done) {

            var query =await ProductModel.find( {name: porductName})
                query.exec(function (err, data) {
                 if(err) return done(err)
                return done(null,data);     
                }); 
             }
             return find;
    }
    // getPorductByPorductName: async function (porductName) {
    //     const id = await ProductModel.findOne({'porductName':porductName}).then(newObj => {
    //         return newObj;
    //     });
    //     return  ProductModel.findById(id); 
    //       //ask taltal how to changed to getPorductById the function
    // }

}


module.exports = productModel;

