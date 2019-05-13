const mongoose = require('mongoose');  
var Schema= mongoose.Schema;  

const Category = mongoose.model('Category', new Schema({
    categoryName:String
}))

module.exports = Category;   