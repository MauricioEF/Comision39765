import BaseRouter from "./Router.js";
import usersController from "../controllers/users.controller.js";

class UsersRouter extends BaseRouter {
    init(){
        this.post('/employee',['ADMIN'],usersController.createEmployee);
    }
}

export default new UsersRouter().getRouter();