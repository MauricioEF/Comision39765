import DTemplates from "../constants/DTemplates.js";
import MailingService from "../services/MailingService.js";

const register = async (req,res)=>{
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
    const token = generateToken(req.user);
    res.cookie('authToken',token,{
        maxAge:1000*3600*24,
        httpOnly:true
    }).sendSuccess("Logged In")
};


export default {
    login,
    register
}