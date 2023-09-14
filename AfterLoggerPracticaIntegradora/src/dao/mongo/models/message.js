import mongoose from 'mongoose';

const collection = "Messages";

const schema = new mongoose.Schema({
    user:String,
    message:String
},{timestamps:{createdAt:'created_at',updatedAt:'updated_at'}}
)

const messageModel = mongoose.model(collection,schema);

export default messageModel;