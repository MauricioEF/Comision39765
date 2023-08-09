export default class CompaniesRepository {
    constructor(dao){
        this.dao = dao;
    }

    get = (params) =>{
        return this.dao.getCompanies(params);
    }

    getBy = (params) =>{
        return this.dao.getCompanyBy(params);
    }

    create = (company) =>{
        return this.dao.createCompany(company);
    }

    update = (id,company) =>{
        return this.dao.updateCompany(id,company);
    }

    delete = (id) =>{
        return this.dao.deleteCompany(id);
    }
}