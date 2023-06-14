import { Router } from "express";
import { authRoles, privacy } from "../middlewares/auth.js";
import { passportCall } from "../utils.js";

const router = Router();

router.get('/register',privacy('NO_AUTHENTICATED'),(req,res)=>{
    res.render('register');
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/profile',privacy('PRIVATE'),(req,res)=>{
    res.render('profile',{
        user:req.session.user
    })
})

router.get('/restorePassword',privacy('NO_AUTHENTICATED'),(req,res)=>{
    res.render('restorePassword')
})

router.get('/',passportCall('jwt',{redirect:'/login'}),authRoles('admin'),(req,res)=>{
    console.log(req.user);
    res.render('jwtProfile', {user:req.user})

})

export default router;