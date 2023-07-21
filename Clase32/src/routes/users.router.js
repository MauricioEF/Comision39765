import { Router } from "express";
import ErrorService from "../services/ErrorService.js";
import { userErrorIncompleteValues } from "../constants/userErrors.js";
import EErrors from "../constants/EErrors.js";

const router = Router();

const users = [];

router.get('/',(req,res)=>{
    res.send({status:"success",payload:users})
})


router.post('/',(req,res)=>{
    const {firstName,lastName,email,password} = req.body;
    //Validar que sí vengan todos los datos.
    if(!firstName||!email||!password){
        //ERROR PARA EL CLIENTE: return res.status(400).send({status:"error",error:"Incomplete values"})
        //Aquí voy a generar un error PARA EL SERVIDOR
        ErrorService.createError({
            name:"Error de creación de usuario",
            cause: userErrorIncompleteValues({firstName,email,password}),
            message: 'Error intentando insertar un nuevo usuario',
            code: EErrors.INCOMPLETE_VALUES,
            status:400
        })

        //intento insertar en la base
        try{

        }catch(error){
            //analiza el error nativo de la librería que tronó
            //Crea tu propio error, con tus códigos conocidos.
            res.sendStatus(500);
        }
    }
    const user = {
        firstName,
        lastName,
        email,
        password
    }
    
    users.push(user);
    res.send({status:"success",message:"Usuario agregado"})
})


export default router;