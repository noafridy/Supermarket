const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
    firslName: String,
    lastNAme: String,
    username: String,
    ID: Number,   // need to be PK
    passwored: String,
    city: String,
    street: String,
    rol:String
}))

module.exports = User;   