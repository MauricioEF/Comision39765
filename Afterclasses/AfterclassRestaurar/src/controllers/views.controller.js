import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import { companiesService } from "../services/repositories.js";
import config from '../config/config.js';

const home = async(req,res)=>{
    try{
        const user = req.user;
        if(!user) return res.redirect('/login');
        switch(user.role){
            case "user":
                return res.render('userHome',{user})
            case "admin":
                console.log(user);
                const company = await companiesService.getBy({users:new mongoose.Types.ObjectId(user.id)})
                console.log(company);
                return res.render('company',{company})
            case "superadmin":
                const companies = await companiesService.get();
                return res.render('companies',{companies})
        }
        
    }catch(error){
        console.log(error);
    }
}

const chat = async(req,res)=>{
    res.render('companyChat');
}

const register = async(req,res)=>{
    res.render('register');
}
const login = async(req,res)=>{
    res.render('login');
}

const restoreRequest = (req,res)=>{
    res.render('restoreRequest')
}

const restorePassword = (req,res) =>{
    const {token} = req.query;
    try{
        const validToken = jwt.verify(token,config.jwt.SECRET)
        //Aquí verifico si está en la whitelist, y si no, también lo mando a inválido.
        res.render('restorePassword') 
    }catch(error){
        return res.render('invalidToken')
    }   
}
export default {
    chat,
    home,
    login,
    register,
    restoreRequest,
    restorePassword
}