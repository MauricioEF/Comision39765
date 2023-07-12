import ordersModel from "./models/orders.models.js";

export default class OrderDao {

    get = (params) =>{
        return ordersModel.find(params);
    }

    getBy = (params) =>{
        return ordersModel.findOne(params);
    }

    save = (order) => {
        return ordersModel.create(order);
    }
}