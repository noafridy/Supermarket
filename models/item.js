const mongoose = require('mongoose');  
var Schema= mongoose.Schema;  

const Item = mongoose.model('Item', new Schema({
    product:{ type: Schema.Types.ObjectId, ref: 'Product'},
    quantity:Number,
    totalCost:Number,
    ShoppingCart:{ type: Schema.Types.ObjectId, ref: 'ShoppingCart'}
}))

module.exports = Item;   