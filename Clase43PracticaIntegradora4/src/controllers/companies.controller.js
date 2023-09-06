import { createHash } from '../services/auth.js';
import { companiesService, usersService } from '../services/repositories.js';
import { makeRandomString } from '../utils.js';
import MailingService  from '../services/MailingService.js';
import DTemplates from '../constants/DTemplates.js';

const getCompanies = async (req, res) => {
  const companies = await companiesService.getCompanies();
  res.send({ status: 'success', payload: companies });
};

const createCompany = async (req, res) => {
  try {
    const {
      name,
      legal_name,
      plan,
      industry,
      address,
      adminFirstName,
      adminLastName,
      adminEmail,
    } = req.body;
    if (
      !name ||
      !legal_name ||
      !industry ||
      !address ||
      !adminFirstName ||
      !adminLastName ||
      !adminEmail
    )
      return res
        .status(400)
        .send({ status: 'error', error: 'Incomplete Values' });
    const company = {
      name,
      legal_name,
      plan,
      industry,
      address,
      planExpiration: new Date().toISOString()
    };
    const companyResult = await companiesService.create(company);
    const basePassword = makeRandomString(8);
    const hashedPassword = await createHash(basePassword);
    const newAdmin = {
      name: `${adminFirstName} ${adminLastName}`,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      company: companyResult._id,
    };
    const userResult = await usersService.create(newAdmin);
    await companiesService.update(companyResult, { users: [userResult._id] });
    try {
      const mailService = new MailingService();
      const result = await mailService.sendMail(adminEmail,DTemplates.NEW_ADMIN,{
        user: {name: newAdmin.name, password: basePassword },
        company
      })
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    res.sendSuccessWithPayload({
      status: 'success',
      payload: { user: userResult._id, company: companyResult._id },
    });
  } catch (error) {
    console.log(error);
    res.sendInternalError('Error');
  }
};

const getCompanyById = async (req, res) => {
  const { cid } = req.params;
  const user = req.user;
  const company = await companiesService.getBy({ _id: cid });
  //Corroborando si la compañía tiene a dicho usuario dentro del arreglo de empleados.
  if (!company)
    return res
      .status(404)
      .send({ status: 'error', error: 'Company not found' });
  res.send({ status: 'success', payload: company });
};

const updateCompany = async (req, res) => {
  const { cid } = req.params;
  const updateCompany = req.body;
  const result = await companiesService.update(cid, updateCompany);
  res.sendStatus(201);
};

const deleteCompany = async (req, res) => {
  const { cid } = req.params;
  await companiesService.delete(cid);
  res.sendStatus(201);
};

const expireCompanies = async ( req,res ) => {
  const companies = req.body;
  console.log(companies);
  //Aquí ya actualizamos las empresas
  //El reto está en que el updateMany requiere un filtro
  await companiesService.bulkUpdate(companies,{status:'expired'})
  //¿Ya hice el bulk update? NOTIFICA CON TUS PLANTILLAS de correos que ya expiró
  res.sendStatus(200);
}

export default {
  createCompany,
  deleteCompany,
  expireCompanies,
  getCompanies,
  getCompanyById,
  updateCompany,
};
