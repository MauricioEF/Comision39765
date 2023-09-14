import viewsController from "../controllers/views.controller.js";
import BaseRouter from "./Router.js";

class ViewsRouter extends BaseRouter {
    init(){
        this.get('/',['PUBLIC'],viewsController.home);
        this.get('/new-company',['SUPERADMIN'],viewsController.newCompany);
        this.get('/new-employee',['ADMIN'],viewsController.newEmployee);
        this.get('/password-restore',['NO_AUTH'],viewsController.restorePassword);
    }
}

const viewsRouter = new ViewsRouter();
export default viewsRouter.getRouter();