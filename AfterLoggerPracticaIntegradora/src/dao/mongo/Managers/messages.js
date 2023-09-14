import messageModel from "../models/message.js";

export default class MessagesDao {
    
    getMessages = (params) =>{
        return messageModel.find(params).lean();
    }

    createMessage = (message) =>{
        return messageModel.create(message);
    }
}