import { Router } from "express";
import jwt from 'jsonwebtoken';

export default class BaseRouter {

    constructor() {
        this.router = Router();
        this.init();
    }

    getRouter() { //Simplemente va a ser para poder acceder al router de express desde fuera
        return this.router;
    }
    
    init() {} //Éste no nos interesa ahorita, pero le interesará a nuestros hijos

    get(path,policies,...callbacks){
        //Aquí mandamos a llamar el get que ya conoces de express
        this.router.get(path,this.handlePolicies(policies),this.generateCustomResponses,this.applyCallbacks(callbacks))
    }

    post(path,policies,...callbacks){
        this.router.post(path,this.handlePolicies(policies),this.generateCustomResponses,this.applyCallbacks(callbacks))
    }

    put(path,policies,...callbacks){
        this.router.put(path,this.handlePolicies(policies),this.generateCustomResponses,this.applyCallbacks(callbacks))
    }

    delete(path,policies,...callbacks){
        this.router.delete(path,this.handlePolicies(policies),this.generateCustomResponses,this.applyCallbacks(callbacks))
    }


    generateCustomResponses = (req,res,next) =>{
        res.sendSuccess = message => res.send({status:"success",message});
        res.sendSuccessWithPayload = payload => res.send({status:"success",payload})
        next();
    }

    handlePolicies = policies => {
        //policies, contendrá TODOS los roles que puedan entrar.
        return (req,res,next) =>{
            if(policies[0] === "PUBLIC") return next();
            const authHeaders = req.headers.authorization;
            if(!authHeaders) return res.status(401).send({status:"error",error:"Unauthorized"});
            const token = authHeaders.split(" ")[1];
            const user = jwt.verify(token,'tokenSecret');
            //Hasta este punto ya tendría al usuario

            //Si NO está incluido el rol del usuario.
            if(!policies.includes(user.role.toUpperCase())) return res.status(403).send({status:"error",error:"Forbidden"})
            req.user = user;
            next();
        }
    }


    
    applyCallbacks(callbacks) {
        return callbacks.map(callback=>async(...params)=>{
            try{
                await callback.apply(this,params);
            }catch(error){
                params[1].status(500).send(error);
            }
        })
    }

}