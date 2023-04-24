import { Router } from "express";

const router = Router();

router.get('/',(req,res)=>{
    const user = {
        name:"Lucas",
        email:"correoagus@correo.com"
    }
    res.render('home',{
        name: user.name,
        css:'home'
    })
})

router.get('/food',(req,res)=>{
    const food = [
        {name:"Hamburguesa", price:100},
        {name:"Papa con queso", price:2000000},
        {name:"Pancho",price:30},
    ]
    res.render('food',{
        food,
        css:'food'
    })
})

router.get('/users',(req,res)=>{
    res.render('users');
})

router.get('/products',(req,res)=>{
    res.render('products');
})

router.get('/register',(req,res)=>{
    res.render('register');
})

export default router;