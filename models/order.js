const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Order = mongoose.model('Order', new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  ShoppingCart: { type: Schema.Types.ObjectId, ref: 'ShoppingCart' },
  totalCost: Number,
  city: String,
  street: String,
  DD: String,     //Delivery date 
  orderDate: String,
  creditCard: String   //Last 4 digits of credit card
}))

module.exports = Order;   