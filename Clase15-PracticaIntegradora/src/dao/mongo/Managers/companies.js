import companyModel from '../models/company.js';

export default class CompaniesManager {
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

  deleteCompany = (id) => {
    return companyModel.findByIdAndDelete(id);
  };
}
