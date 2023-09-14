import companyModel from '../models/company.js';

export default class CompaniesDao {
  getCompanies = (params) => {
    return companyModel.find(params).lean();
  };

  getCompanyBy = (params) => {
    return companyModel.findOne(params).lean();
  };

  createCompany = (company) => {
    return companyModel.create(company);
  };

  updateCompany = (id, company) => {
    return companyModel.findByIdAndUpdate(id, { $set: company });
  };

  bulkUpdate = (bulk) =>{
    return companyModel.bulkWrite(bulk);
  }

  deleteCompany = (id) => {
    return companyModel.findByIdAndDelete(id);
  };

  addUser = (id,userId) =>{
    return companyModel.findByIdAndUpdate(id,{$push:{users:userId}})
  }
}
