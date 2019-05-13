const mongoose = require('mongoose');  
var Schema= mongoose.Schema;  

const Product = mongoose.model('Product', new Schema({
    ProductName:String,
    category:{ type: Schema.Types.ObjectId, ref: 'Category'},
    price:Number,
    img:String
}))

module.exports = Product;   