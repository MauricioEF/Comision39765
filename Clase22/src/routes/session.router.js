import { Router } from "express";
import passport from 'passport';
import userModel from '../dao/mongo/user.js';
import {createHash, generateToken, passportCall, validatePassword } from '../utils.js';
import { authToken } from "../middlewares/jwtAuth.js";

const router = Router();

router.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/registerFail', failureMessage:true}),async(req,res)=>{
    res.send({status:"success",message:"Registered"});
})

router.get('/registerFail',(req,res)=>{
    console.log(req.session.messages);
    res.status(400).send({status:"error",error:req.session.messages})
})

router.post('/login',passportCall('login'),async(req,res)=>{
      const user = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      };
      const accessToken = generateToken(user);
    //Aquí envío el token por el body, para que el front lo guarde
    //   res.send({status:"success",accessToken})

    //Envío desde una cookie:
    res.cookie('authToken',accessToken, {
        maxAge:1000*60*60*24,
        httpOnly:true,
        sameSite:"strict"
    }).sendStatus(200);

})

router.get('/github',passportCall('github'),(req,res)=>{});

router.get('/githubcallback',passportCall('github'),(req,res)=>{
    const user = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      };
      const accessToken = generateToken(user);
    //Aquí envío el token por el body, para que el front lo guarde
    //   res.send({status:"success",accessToken})

    //Envío desde una cookie:
    res.cookie('authToken',accessToken, {
        maxAge:1000*60*60*24,
        httpOnly:true,
        sameSite:"strict"
    }).sendStatus(200);
    res.send({status:"success",message:"Logueado, PERO CON GITHUB!!!!!"})
})



router.post('/jwtLogin', async(req,res)=>{

})

router.get('/jwtProfile',authToken,async(req,res)=>{
    console.log(req.user);
    res.send({status:"success",payload:req.user})
})


router.post('/restorePassword',async(req,res)=>{
    const {email, password } = req.body;
    //¿El usuario sí existe?
    const user = await userModel.findOne({email})
    if(!user) return res.status(400).send({status:"error",error:"User doesn't exist"})
    const isSamePassword = await validatePassword(password,user.password);
    if(isSamePassword) return res.status(400).send({status:"error",error:"Cannot replace password with current password"})
    //Ahora sí, actualizamos
    const newHashedPassword = await createHash(password);
    await userModel.updateOne({email},{$set:{password:newHashedPassword}});
    res.sendStatus(200);
})

export default router;