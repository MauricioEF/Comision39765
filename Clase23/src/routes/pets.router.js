import { Router } from "express";

const router = Router();

router.param('pet', (req,res,next,pet)=>{
    const isValidParam = /^[A-Za-z\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA]+$/.test(pet);
    if(!isValidParam) return res.status(404).send({status:"error",error:'not found'})

    //Aquí podría buscar a la mascota en la base de datos

    req.pet = pet;
    next();
});

//Validación a nivel URL:  ([a-zA-Z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC%20])
router.get('/:pet',(req,res)=>{
    res.send(req.pet);
});

router.put('/:pet',(req,res)=>{
    res.send(req.pet);
});


router.get('/:pet/adoption',(req,res)=>{
    res.send(req.pet);
})

router.get('*',(req,res)=>{
    res.send("Mascota no encontrada");
})

export default router;