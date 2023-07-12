import usersModel from "./models/users.model.js";

export default class UserDao {

    get = (params) =>{
        return usersModel.find(params);
    }

    getBy = (params) =>{
        return usersModel.findOne(params);
    }

    save = (user) => {
        return usersModel.create(user);
    }

    update = (id,user) =>{
        return usersModel.findByIdAndUpdate(id,{$set:user});
    }
}