import UserManager from "../dao/Mongote/UserMongoteManager.js";
import UsersService from "./users.service.js";


export const userService = new UsersService(new UserManager());