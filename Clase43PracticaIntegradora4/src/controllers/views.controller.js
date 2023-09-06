import { companiesService } from "../services/repositories.js";

const home = async(req,res)=>{
    console.log(req.user);
    if(!req.user) return res.render('Login');
    else {
        switch(req.user.role){
            case "user":
                return res.render('UserHome',{user:req.user});
            case "admin":
                {
                    const company = await companiesService.getBy({_id:req.user.company});
                    return res.render('Company',{company})
                }
            case "superadmin":
                {
                    const companies = await companiesService.get();
                    return res.render('Companies',{companies})
                }
        }
    }
}

const newCompany = async(req,res)=>{
    res.render('NewCompany');
}

const newEmployee = (req,res)=>{
    res.render('NewEmployee');
}

const  restorePassword = (req,res)=> {
    res.render('RestorePassword');
}

export default {
    home,
    newCompany,
    newEmployee,
    restorePassword
}