import { userService } from '../services/repositories/index.js';

const getUsers = async(req, res) => {
  const users = await  userService.getAllUsers()
  res.send(users);
};

const saveUser = async (req, res) => {
  const user = req.body;
  await userService.createUser(user);
  res.sendStatus(200);
};

export default {
  getUsers,
  saveUser,
};
