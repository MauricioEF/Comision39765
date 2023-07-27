import { Router } from "express";


const router = Router();

router.get('/',(req,res)=>{
    req.logger.error("Información de usuario");
    res.send("Users");
})

export default router;