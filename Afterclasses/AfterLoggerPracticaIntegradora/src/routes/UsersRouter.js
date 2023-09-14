import BaseRouter from "./Router.js";
import usersController from "../controllers/users.controller.js";

class UsersRouter extends BaseRouter {
    init(){
        this.post('/employee',['ADMIN'],usersController.createEmployee);
        this.put('/new-password-temp',['NO_AUTH'],usersController.newPasswordTemp)
    }
}

export default new UsersRouter().getRouter();