import { createHash } from '../services/auth.js';
import { companiesService, usersService } from '../services/repositories.js';

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
    };
    const companyResult = await companiesService.create(company);
    const basePassword = '123';
    const hashedPassword = await createHash(basePassword);
    const newAdmin = {
      name: `${adminFirstName} ${adminLastName}`,
      email: adminEmail,
      password: '123',
      password: hashedPassword,
      role: 'admin',
      company: companyResult._id,
    };
    const userResult = await usersService.create(newAdmin);
    await companiesService.update(companyResult, { users: [userResult._id] });
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

export default {
  createCompany,
  deleteCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
};
