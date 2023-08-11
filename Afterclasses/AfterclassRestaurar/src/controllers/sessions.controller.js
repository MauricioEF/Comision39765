import jwt from 'jsonwebtoken';
import config from "../config/config.js";
import DTemplates from "../constants/DTemplates.js";
import RestoreTokenDTO from "../dto/User/RestoreTokenDTO.js";
import MailingService from "../services/MailingService.js";
import { generateToken, validatePassword, createHash} from "../services/auth.js";
import { usersService } from "../services/repositories.js";


const register = async (req,res)=>{
    console.log(req.user);
    const mailingService = new MailingService();
    try{
        const result = await mailingService.sendMail(req.user.email,DTemplates.WELCOME,{user:req.user})
        console.log(result);
        res.sendSuccess("Registered")
    }catch(error){
        res.sendInternalError(error);
    }

};


const login = (req,res)=>{
    console.log(req.user)
    const token = generateToken(req.user);
    res.cookie(config.jwt.COOKIE,token,{
        maxAge:1000*3600*24,
        httpOnly:true
    }).sendSuccess("Logged In")
};

const restoreRequest = async(req,res) =>{
    const {email} = req.body;
    if(!email) return res.sendBadRequest('No se proporcionó un email');
    const user = await usersService.getBy({email});
    if(!user) return res.sendBadRequest('Email no válido');
    //Hasta aquí todo bien. Crear un restoreToken.
    const restoreToken = generateToken(RestoreTokenDTO.getFrom(user),'1h');
    //Guardar el Token en mi WhiteList
    const mailingService = new MailingService();
    const result = await mailingService.sendMail(user.email,DTemplates.RESTORE,{restoreToken})
    console.log(result);
    res.sendSuccess('Correo enviado')
}

const restorePassword = async(req,res) =>{
    const {password,token} = req.body;
    try{
        const tokenUser = jwt.verify(token,config.jwt.SECRET);
        const user = await usersService.getBy({email: tokenUser.email});
        //Verificar que la contraseña no sea la misma que ya tenemos
        const isSamePassword = await validatePassword(password,user.password);
        if(isSamePassword) return res.sendBadRequest('Su contraseña es la misma');
        const newHashedPassword = await createHash(password);
        await usersService.update(user._id,{password:newHashedPassword});
        //Aquí borras el token del whitelist
        res.sendSuccess("Contraseña Cambiada");
    }catch(error){
        console.log(error);
    }
}


export default {
    login,
    register,
    restoreRequest,
    restorePassword
}