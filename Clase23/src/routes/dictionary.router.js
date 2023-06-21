import { Router } from "express";

const router = Router();

router.param

router.get('/:word([a-zA-Z%C3%A1]+)',(req,res)=>{
    console.log(req.params.word)
    res.send({palabraABuscar:req.params.word})
})


export default router;