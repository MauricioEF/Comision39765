import { Router } from "express";
import uploader from "../services/uploader.js";


const router = Router();

const pets = [];

router.get('/',(req,res)=>{
    res.send(pets);
})

router.post('/',uploader.single("image"),(req,res)=>{
    //Aquí llega al final.
    const pet = req.body;
    pets.push(pet);
    res.send({status:"success",message:"Pet added"})
})

router.put('/',(req,res)=>{
    
})

router.delete('/',(req,res)=>{
    
})


router.post('/:cid/product/:pid',(req,res)=>{
    const quantity = req.body.quantity || 1;
})

export default router;