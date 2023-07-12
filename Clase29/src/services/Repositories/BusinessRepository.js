
export default class BusinessRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAllBusiness = (params) =>{
        return this.dao.get(params);
    }

    getBusinessBy = (params) =>{
        return this.dao.getBy(params);
    }

    createBusiness =(business) =>{
        return this.dao.save(business);
    }
}