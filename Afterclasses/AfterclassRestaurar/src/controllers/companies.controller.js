import { companiesService } from "../services/repositories.js";

const getCompanies = async (req, res) => {
  const companies = await companiesService.get();
  res.send({ status: 'success', payload: companies });
}

const createCompany = async (req, res) => {
    const { name, legal_name, plan, industry, address } = req.body;
    if(!name||!legal_name||!industry||!address) return res.status(400).send({status:"error",error:"Incomplete Values"})
    const company = {
      name,
      legal_name,
      plan,
      industry,
      address
    }
    const result = await companiesService.createCompany(company);
    res.sendStatus(201);
  };

const getCompanyById = async (req, res) => {
    const { cid } = req.params;
    const user = req.user;
    const company = await companiesService.getCompanyBy({ _id: cid });
    //Corroborando si la compañía tiene a dicho usuario dentro del arreglo de empleados.
    if (!company)
      return res.status(404).send({ status: 'error', error: 'Company not found' });
    res.send({ status: 'success', payload: company });
  };

const updateCompany = async(req,res)=>{
    const {cid} = req.params;
    const updateCompany = req.body;
    const result = await companiesService.updateCompany(cid,updateCompany);
    res.sendStatus(201);
  };

const deleteCompany = async(req,res)=>{
    const {cid} = req.params;
    await companiesService.deleteCompany(cid);
    res.sendStatus(201);
  };

export default {
    createCompany,
    deleteCompany,
    getCompanies,
    getCompanyById,
    updateCompany
}