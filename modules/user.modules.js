var UserModel = require('../models/user')

var userModule = {
    addNew: function (userObj) {
        let user = new UserModel(userObj);
        return user.save();
    },
    getAll: function () {
        return UserModel.find();
    },
    updateRole :async function(id,role){
        debugger
       let user = await UserModel.findById(id);  //let becaouse i will change the role
       user.role = role;   //role => admin or user
       return user.save();
    },
     checkIfExistID: async function(ID) {
        const user =  await UserModel.findOne({ID: ID});
        return user;
    }

}


module.exports = userModule;