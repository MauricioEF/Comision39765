import { Router } from "express";
import CompaniesManager from "../dao/mongo/Managers/companies.js";

const router = Router();
const companiesService = new CompaniesManager();

router.get('/',async(req,res)=>{
    const companies = await companiesService.getCompanies();
    res.render('companies',{companies});
})

router.get('/chat',async(req,res)=>{
    res.render('companyChat');
})
export default router;