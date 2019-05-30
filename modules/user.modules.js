var UserModel = require('../models/user')

var userModule = {
    addNew: function (userObj) {
        let user = new UserModel(userObj);
        return user.save();
    },
    getAll: function () {
        return UserModel.find();
    }

}


module.exports = userModule;