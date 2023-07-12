
export default class BaseRepository {
    constructor(dao,model) {
        this.dao = dao;
        this.model = model;
    }

    getAll = (params) =>{
        return this.dao.get(params,this.model);
    }

    getBy = (params) => {
        return this.dao.getBy(params,this.model);
    }

    create = (data) => {
        return this.dao.save(data,this.model);
    }

    update = (id,data) =>{
        return this.dao.update(id,data,this.model);
    }

    delete = (id) =>{
        return this.dao.delete(id,this.model);
    }

}