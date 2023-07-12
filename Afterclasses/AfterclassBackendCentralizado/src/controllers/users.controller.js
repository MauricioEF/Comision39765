import { usersService } from "../services/repositories.js";

const getUsers = async(req,res) =>{
    const users = await usersService.getAll();
    res.send({status:"success",payload:users})
}

const getUserById = async(req,res) =>{

}

const saveUser = async(req,res) =>{
    const user = req.body;
    const result = await usersService.create(user);
    res.send({status:'success',payload:result})
}

export default {
    getUserById,
    getUsers,
    saveUser
}