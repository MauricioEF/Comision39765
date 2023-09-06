import config from "../config/config.js";
import UserTokenDTO from "../dto/User/TokenDTO.js";
import { createHash, generateToken, validatePassword } from "../services/auth.js";
import { companiesService, usersService } from "../services/repositories.js";
import jwt from 'jsonwebtoken';

const createEmployee = async(req,res)=>{
    const {
        firstName,
        lastName,
        email
    } = req.body;
    if(!firstName||!lastName||!email) return res.sendBadRequest("Incomplete values");
    const basePassword = "123";
    const hashedPassword = await createHash(basePassword);
    const newEmployee = {
        name: `${firstName} ${lastName}`,
        email,
        password:hashedPassword
    }
    const companyId = req.user.company;
    const result = await usersService.create(newEmployee);
    await companiesService.addUser(companyId,result._id);
    res.sendSuccessWithPayload({employeeId:result._id})
}

const newPasswordTemp  = async(req,res)=>{
    try{
        const {newPassword} = req.body;
        if(!newPassword) return res.sendBadRequest('Incomplete values');
        //Yo guardé el email en la cookie temp, de ahí me voy a basar.
        const cookie = req.cookies['temp'];
        if(!cookie) return res.sendBadRequest('Invalid process');
        const cookieUser = jwt.verify(cookie,config.jwt.SECRET);
        //dentro de la cookie debe venir un objeto únicamente con el mail
        const user = await usersService.getBy({email:cookieUser.email});
        if(!user) return res.sendBadRequest('User not found');
        //Verifico que no use la misma contraseña temporal
        const isSamePassword = await validatePassword(newPassword,user.password);
        if(isSamePassword) return res.sendBadRequest('the new password cannot be equal to the current password');
        //Ahora sí, hasta aquí ya lo logré
        const newHashedPassword = await createHash(newPassword);
        await usersService.update(user._id,{
            temporalPassword:false,
            password:newHashedPassword
        })
        //Tenemos de dos SOPOTAS, o le digo que ya se puede loguear, o bien le creo ya su verdadera cookie
        const tokenizedUser = UserTokenDTO.getFrom(user);
        const token = generateToken(tokenizedUser);
        res.cookie('authToken',token).clearCookie('temp').send({status:"success",redirect:'/'})
    
    }catch(error){
        console.log(error);
        res.sendInternalError('Ouch')
    }
}

export default {
    createEmployee,
    newPasswordTemp
}