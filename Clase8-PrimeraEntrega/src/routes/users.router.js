import { Router } from "express";

const router = Router();

const users = [] ;

router.get('/',(req,res)=>{
    res.send(users);
})

router.post('/',(req,res)=>{
    const user = req.body;
    users.push(user);
    res.send({status:"success",message:"User added"})
})

router.put('/:uid',(req,res)=>{
    
})

router.delete('/',(req,res)=>{
    const {name,gender,id} = req.query;

})

export default router;