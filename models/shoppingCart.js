const mongoose = require('mongoose');  
var Schema= mongoose.Schema;  

const ShoppingCart = mongoose.model('ShoppingCart', new Schema({
    user:{ type: Schema.Types.ObjectId, ref: 'User'},
    date: Date
}))

module.exports = ShoppingCart;   