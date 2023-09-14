import UsersRepository from "./Repositories/UsersRepository.js";
import CompaniesRepository from "./Repositories/CompaniesRepository.js";
import MessagesRepository from "./Repositories/MessagesRepository.js";

import UsersDao from '../dao/mongo/Managers/users.js';
import CompaniesDao from "../dao/mongo/Managers/companies.js";
import MessagesDao from '../dao/mongo/Managers/messages.js';

export const usersService = new UsersRepository(new UsersDao());
export const companiesService = new CompaniesRepository(new CompaniesDao());
export const messagesService = new MessagesRepository(new MessagesDao());