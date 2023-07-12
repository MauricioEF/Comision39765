import UserRepository from "./Repositories/UserRepository.js";
import OrderRepository from "./Repositories/OrderRepository.js";
import BusinessRepository from "./Repositories/BusinessRepository.js";
import ProductRepository from "./Repositories/ProductRepository.js";

import Dao from "../dao/dao.js";

const dao = new Dao();

export const usersService = new UserRepository(dao);
export const ordersService = new OrderRepository(dao);
export const businessService = new BusinessRepository(dao);
export const productsService = new ProductRepository(dao);

/**
 * Bases para aprender a aprender rápido.
 * 
 * 1. Enfréntate a tus errores. (Superar bloqueo)
 * 2. Concéntrate en la base de las cosas.
 * 3. Algoritmia, práctica.
 *      * Dados dos arreglos, devuelve un arreglo que tenga la suma de esos dos arreglos.
 *      * Algoritmos de búsqueda.
 *      * Algoritmos de ordenamiento.
 *      * Algoritmos de balance.
 * 4. Resuelve problemas reales.
 * 5. Nunca olvidar que es tu formación.
 */