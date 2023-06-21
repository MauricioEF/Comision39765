import BaseRouter from "./router.js";
import jwt from 'jsonwebtoken';

export default class SessionsRouter extends BaseRouter {
    init() {
        this.post('/login',["PUBLIC"],(req,res)=>{
            //Simulamos que el usuario sí se logueó bien
            const user = {
                email:"CorreoFeliz@correo.com",
                role:"user"
            }
            const token = jwt.sign(user,'tokenSecret');
            res.sendSuccessWithPayload({token})
        })
        this.get('/current',["USER","ADMIN"],(req,res)=>{
            res.sendSuccessWithPayload({user:req.user})
        })

        this.post('/',["PUBLIC"],(req,res)=>{

        })
    }
}