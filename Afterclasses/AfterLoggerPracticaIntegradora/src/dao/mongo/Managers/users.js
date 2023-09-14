import userModel from "../models/user.js";

export default class UsersDao {
  getUsers = (params) => {
    return userModel.find(params).lean();
  };

  getUserBy = (params) => {
    return userModel.findOne(params).lean();
  };

  createUser = (user) => {
    return userModel.create(user);
  };

  updateUser = (id, user) => {
    return userModel.findByIdAndUpdate(id, { $set: user });
  };

  deleteUser = (id) => {
    return userModel.findByIdAndDelete(id);
  };
}
