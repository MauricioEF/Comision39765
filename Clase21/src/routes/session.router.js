import { Router } from "express";
import passport from 'passport';
import userModel from '../dao/mongo/user.js';
import {createHash, generateToken, validatePassword } from '../utils.js';
import { authToken } from "../middlewares/jwtAuth.js";

const router = Router();

router.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/registerFail', failureMessage:true}),async(req,res)=>{
    res.send({status:"success",message:"Registered"});
})

router.get('/registerFail',(req,res)=>{
    console.log(req.session.messages);
    res.status(400).send({status:"error",error:req.session.messages})
})

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail', failureMessage:true}),async(req,res)=>{
    req.session.user = {
        name: req.user.name,
        role: req.user.role,
        id: req.user.id,
        email: req.user.email
    }
    return res.sendStatus(200);
})
router.get('/loginFail',(req,res)=>{
    console.log(req.session.messages);
    if(req.session.messages.length>4) return res.status(400).send({message:"BLOQUEA LOS INTENTOS YA!!!!!"})
    res.status(400).send({status:"error",error:req.session.messages});
})

router.get('/github',passport.authenticate('github'),(req,res)=>{});

router.get('/githubcallback',passport.authenticate('github'),(req,res)=>{
    const user = req.user;
    //Aquí ya creo la sesión.
    req.session.user = {
        id: user.id,
        name: user.first_name,
        role:user.role,
        email:user.email
    }
    res.send({status:"success",message:"Logueado, PERO CON GITHUB!!!!!"})
})



router.post('/jwtLogin', async(req,res)=>{
    const  {email, password} = req.body;
    let accessToken;
    if (email === 'admin@admin.com' && password === '123') {
        //Desde aquí ya puedo inicializar al admin.
        const user = {
          id: 0,
          name: `Admin`,
          role: 'admin',
          email: '...',
        };
        //Adiós a session. GENERO TOKEN
        accessToken = generateToken(user);
        res.send({status:"success",accessToken:accessToken})
      }
      let user;

      user = await userModel.findOne({ email }); //Sólo busco por mail
      if (!user)
      return res.sendStatus(400);
      const isValidPassword = await validatePassword(password, user.password);
      if (!isValidPassword)
        return res.sendStatus(400);
      user = {
        id: user._id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role,
      };
      accessToken = generateToken(user);
      res.send({status:"success",accessToken})
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