const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')
mongoose.set('useCreateIndex', true); // need for create PK
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,  //mail
    ID: Number, // need to be PK
    password: String,
    city: String,
    street: String,
    role: String
});
// userSchema.index({ID:1,type: -1 });

userSchema.methods.encryptPassword = function (password) {
    const encPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
    return encPassword;
};

userSchema.methods.validPassword = function (password) {
    const  validPassword = bcrypt.compareSync(password, this.password);
    debugger;
    return validPassword;
}

const User = mongoose.model('User', userSchema)

module.exports = User;   