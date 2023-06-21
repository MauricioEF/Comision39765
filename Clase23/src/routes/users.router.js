import BaseRouter from "./router.js";

export default class UserRouter extends BaseRouter {

    init() {
        this.get('/',(req,res)=>{
            res.sendSuccess("Usuario")
        })

        this.get('/aaa',(req,res)=>{
            res.sendSuccessWithPayload({name:"Carlos",email:"correo@correo.com"})
        })
    }

}