import userModel from "./models/user.js";

export default  class UserManager {

    getUserBy = params => userModel.findOne(params);
    createUser = user => userModel.create(user);
    updateUser = (id,user) => userModel.findByIdAndUpdate(id,{$set:user})
    
}