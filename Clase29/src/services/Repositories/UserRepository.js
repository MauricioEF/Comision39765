

export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAllUsers = (params) =>{
        return this.dao.get(params);
    }

    getUserBy = (params) =>{
        return this.dao.getBy(params);
    }

    createUser =(user) =>{
        return this.dao.save(user);
    }

    update = (id,user) =>{
        return this.dao.update(id,user);
    }
}