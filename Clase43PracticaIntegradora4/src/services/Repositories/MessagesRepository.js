export default class MessagesRepository {
    constructor(dao){
        this.dao = dao;
    }

    get = (params) =>{
        return this.dao.getMessages(params);
    }

    create = (message) =>{
        return this.dao.createMessage(message);
    }

}