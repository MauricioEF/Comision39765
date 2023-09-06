import mongoose from "mongoose";


const collection = "Users";

const schema = new mongoose.Schema({
    name:String,
    email:String,
    role:{
        type:String,
        default:'user'
    },
    company:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Companies'
    },
    password:String,
    temporalPassword: {
        type:Boolean,
        default:true
    },
    documents:[
        {},
        {},
        {}
    ]
})

const userModel = mongoose.model(collection,schema);

export default userModel;