import BaseRouter from "./Router.js";
import viewsController from "../controllers/views.controller.js";

export default class ViewsRouter extends BaseRouter{
    init(){
        this.get('/',['PUBLIC'],viewsController.home)
        this.get('/chat',['ADMIN','USER'],viewsController.chat)
        this.get('/register',['NO_AUTH'],viewsController.register);
        this.get('/login',['NO_AUTH'],viewsController.login);
        this.get('/restoreRequest',['PUBLIC'],viewsController.restoreRequest)
        this.get('/restorePassword',['NO_AUTH'],viewsController.restorePassword)
    }
}
