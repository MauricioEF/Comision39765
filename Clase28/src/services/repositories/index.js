import PersistenceFactory from "../../dao/Factory.js";
import UserRepository from "../UserRepository.js";


const userDao = await PersistenceFactory.getPersistence()
console.log(userDao);

export const userService = new UserRepository(userDao);