import { Router } from "express";
import { generateUser } from "../mocks/users.mock.js";


const router = Router();

router.get('/mock', (req,res)=>{
    const users = [];
    //Endpoint que devolverá 100 usuarios de prueba.
    for(let i=0;i<100;i++){
        users.push(generateUser());
    }
    res.send({status:"success",payload:users})
})

export default router;