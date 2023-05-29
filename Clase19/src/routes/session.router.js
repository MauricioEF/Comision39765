import { Router } from "express";
import userModel from "../dao/mongo/user.js";


const router = Router();

router.post('/register',async(req,res)=>{
    const result = await userModel.create(req.body);//Suponiendo que envió todo bien
    res.send({status:"success",payload:result});
})

router.post('/login',async(req,res)=>{
    const {email, password} = req.body;
    //Número 1!!!!! buscar al usuario, ¿existe?
    const user = await userModel.findOne({email,password});
    if(!user) return res.status(400).send({status:"error",error:"Usuario o contraseña incorrectas"});
    
    //Número 2!!!! si sí existe el usuario, Créale una SESIÓN.

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email:user.email
    }

    res.sendStatus(200);
})

export default router;