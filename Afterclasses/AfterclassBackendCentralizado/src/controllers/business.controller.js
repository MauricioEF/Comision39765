import { businessService } from "../services/repositories.js"

const getBusiness = async(req,res) =>{
    const business = await businessService.getAll();
    res.send({status:"success",payload:business})
}

const getBusinessById = async(req,res) =>{
    res.send("Get by Id")
}

const saveBusiness = async(req,res) =>{
    const business = req.body;
    const result = await businessService.create(business);
    res.send({status:"success",payload:result})
}

export default {
    getBusiness,
    getBusinessById,
    saveBusiness
}