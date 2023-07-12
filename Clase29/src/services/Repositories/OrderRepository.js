

export default class OrderRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAllOrders = (params) =>{
        return this.dao.get(params);
    }

    getOrderBy = (params) =>{
        return this.dao.getBy(params);
    }

    createOrder =(order) =>{
        return this.dao.save(order);
    }
}