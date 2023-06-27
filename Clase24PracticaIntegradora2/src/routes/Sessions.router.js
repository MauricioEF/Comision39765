import { generateToken, passportCall } from "../services/auth.js";
import BaseRouter from "./Router.js";

export default class SessionsRouter extends BaseRouter {
    init() {
        this.post('/register',['NO_AUTH'],passportCall('register',{strategyType:"locals"}),(req,res)=>{
            res.sendSuccess()
        })
        this.post('/login',['NO_AUTH'],passportCall('login',{strategyType:"locals"}),(req,res)=>{
            const token = generateToken(req.user);
            res.cookie('authToken',token,{
                maxAge:1000*3600*24,
                httpOnly:true
            }).sendSuccess("Logged In")
        })
    }
}