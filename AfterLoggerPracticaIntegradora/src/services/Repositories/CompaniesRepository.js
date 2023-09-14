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

    addUser = (id,userId) =>{
        return this.dao.addUser(id,userId);
    }

    bulkUpdate = (companies,updateBody) =>{
        const bulk = [];
        companies.forEach(company=>{
            const updateDoc = {
                'updateOne':{
                    'filter': {_id:company._id},
                    'update':updateBody,
                    'upsert':false
                }
            }
            bulk.push(updateDoc);
        })
        return this.dao.bulkUpdate(bulk);
    }
}