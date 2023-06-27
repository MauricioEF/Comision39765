import { Router } from "express";
import { auth, auth2 } from "../utils.js";
import { cartsService } from "../dao/index.js";


const router = Router();

router.get('/',auth2,async (req,res)=>{
    if(!req.user&&!req.cookies['auxCart']){
        const auxCart = await cartsService.createCart();
        return res.cookie('auxCart',auxCart._id).send('Entré, pero con una cookie carrito espía')
    } 
    res.send("Entré");
})

export default router;