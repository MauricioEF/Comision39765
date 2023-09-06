import { createHash } from "../services/auth.js";
import { companiesService, usersService } from "../services/repositories.js";

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

export default {
    createEmployee
}