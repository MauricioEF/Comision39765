import { Router } from "express";
import userModel from "../dao/mongo/user.js";
import { createHash, validatePassword } from "../utils.js";


const router = Router();

router.post('/register',async(req,res)=>{
    const { first_name, last_name, email, password} = req.body;
    //Número 1! Corrobora si el usuario ya existe.
    const exists = await userModel.findOne({email});
    if(exists) return res.status(400).send({status:"error",error:"User already exists"});
    //Número 2! Si el usuario no existe, ahora sí ENCRIPTAMOS SU CONTRASEÑA
    const hashedPassword = await createHash(password);
    //Número 3! Construimos el usuario que voy a registrar
    const user = {
        first_name,
        last_name,
        email,
        password: hashedPassword
    }
    const result = await userModel.create(user);
    res.send({status:"success",payload:result});
})

router.post('/login',async(req,res)=>{
    const {email, password} = req.body;

    if(email==="admin@admin.com"&&password==="123"){
        //Desde aquí ya puedo inicializar al admin.
        req.session.user = {
            name: `Admin`,
            role:"admin",
            email:"..."
        }
        return res.sendStatus(200);
    }

    //Número 1!!!!! buscar al usuario, ¿existe?
    const user = await userModel.findOne({email});//Sólo busco por mail
    if(!user) return res.status(400).send({status:"error",error:"Credenciales incorrectas"});
    
    //Número 2!!!! si sí existe el usuario, VERIFICA SU PASSWORD ENCRIPTADO

    const isValidPassword = await validatePassword(password,user.password);
    if(!isValidPassword) return res.status(400).send({status:"error",error:"Contraseña inválida"});

    //Número 3!!! ¿El usuario existe y SÍ PUSO SU CONTRASEÑA CORRECTA? ahora sí crea su sesión.

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email:user.email
    }

    res.sendStatus(200);
})

export default router;