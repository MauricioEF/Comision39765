import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    cart:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Carts'
    }
})

const userModel = mongoose.model(collection,schema);

export default userModel;