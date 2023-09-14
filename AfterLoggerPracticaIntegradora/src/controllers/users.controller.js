import config from "../config/config.js";
import UserTokenDTO from "../dto/User/TokenDTO.js";
import { createHash, validatePassword } from "../services/auth.js";
import { companiesService, usersService } from "../services/repositories.js";
import { makeRandomString } from "../utils.js";
import jwt from 'jsonwebtoken';

const createEmployee = async(req,res)=>{
    const {
        firstName,
        lastName,
        email
    } = req.body;
    if(!firstName||!lastName||!email) return res.sendBadRequest("Incomplete values");
    const basePassword = makeRandomString(8);
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

const newPasswordTemp = async(req,res)=>{
    try {
        const {newPassword} = req.body;
        if(!newPassword) return res.sendBadRequest('Incomplete values');
        //Retrieve userEmail from cookie
        const cookie = req.cookies['temp'];
        if(!cookie) return res.sendBadRequest('Restore Flow alterated, no temp cookie provided');
        const cookieUser = jwt.verify(cookie,config.jwt.SECRET)
        const user = await usersService.getBy({email:cookieUser.email});
        if(!user) return res.sendBadRequest('User not found');
        const isSamePassword = await validatePassword(newPassword,user.password);
        if(isSamePassword) return res.sendBadRequest('the new password cannot be equal to current Password');
        const newHashedPassword = await createHash(newPassword);
        await usersService.update(user._id,{
            temporalPassword:false,
            password:newHashedPassword
        })
        const token = UserTokenDTO.getFrom(user);
        res.cookie(config.jwt.COOKIE,token).clearCookie('temp').send({status:"success"})
    } catch (error) {
        console.log(error);
        res.sendInternalError('ok')
    }
}

export default {
    createEmployee,
    newPasswordTemp
}