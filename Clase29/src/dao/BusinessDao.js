import businessModel from "./models/business.model.js";

export default class BusinessDao {

    get = (params) =>{
        return businessModel.find(params);
    }

    getBy = (params) =>{
        return businessModel.findOne(params);
    }

    save = (business) => {
        return businessModel.create(business);
    }
}