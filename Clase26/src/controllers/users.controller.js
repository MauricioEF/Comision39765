import { userService } from '../services/index.js';

const getUsers = (req, res) => {
  const users = userService.getAllUsers()
  res.send(users);
};

const saveUser = (req, res) => {
  const user = req.body;
  userService.createUser(user);
  res.sendStatus(200);
};

export default {
  getUsers,
  saveUser,
};
