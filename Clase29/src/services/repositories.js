import UserRepository from "./Repositories/UserRepository.js";
import OrderRepository from "./Repositories/OrderRepository.js";
import BusinessRepository from "./Repositories/BusinessRepository.js";

import UserDao from "../dao/UserDao.js";
import OrderDao from "../dao/OrderDao.js";
import BusinessDao from "../dao/BusinessDao.js";


export const usersService = new UserRepository(new UserDao());
export const ordersService = new OrderRepository(new OrderDao());
export const businessService = new BusinessRepository(new BusinessDao());