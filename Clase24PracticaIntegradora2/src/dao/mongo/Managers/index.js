import UsersManager from "./users.js";
import CompaniesManager from "./companies.js";
import MessagesManager from "./messages.js";

export const usersService = new UsersManager();
export const companiesService = new CompaniesManager();
export const messagesService = new MessagesManager();