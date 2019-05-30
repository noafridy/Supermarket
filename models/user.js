const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true); // need for create PK
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firslName: String,
    lastName: String,
    username: String,  //mail
    ID: Number, // need to be PK
    passwored: String,
    city: String,
    street: String,
    rol:String
});
// userSchema.index({ID:1,type: -1 });

const User = mongoose.model('User', userSchema)

module.exports = User;   