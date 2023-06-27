import { Router } from "express";
import { cartsService, usersService } from "../dao/index.js";
import { generateToken } from "../utils.js";

const router = Router();

router.post('/register',async(req,res)=>{
    const user = req.body;
    if(req.cookies['auxCart']){
        //Si sí tienes un auxCart, es porque NUNCA te logueaste. Significa que el usuario
        //requerirá ese carrito que está en la cookie
        user.cart = req.cookies['auxCart'];
        await usersService.createUser(user);
        return res.clearCookie('auxCart').send({message:"Listo, continúa"})
    }
    const cart = await cartsService.createCart();
    user.cart =  cart._id;
    await usersService.createUser(user);
    res.sendStatus(200);
})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const user = await usersService.getUserBy({email,password});
    if(!user) return res.sendStatus(401);
    if(req.cookies['auxCart']){
        /**
         * Tienes de dos sopas
         * 1. Se pierde todo lo que estabas buscando y se queda el carrito que sí tenía el usuario
         * 2. Vas a hacer un merge, del carrito de la cookie, hacia el carrito del usuario, conservando
         * El primer carrito con el que el usuario se registró.
         */
    }
    const token = generateToken({user});

    res.cookie('authToken',token).sendStatus(200);
})

export default router;