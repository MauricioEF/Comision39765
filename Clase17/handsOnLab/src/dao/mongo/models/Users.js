import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = "Users";

const schema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    gender:String
})

schema.plugin(mongoosePaginate);


const usersModel = mongoose.model(collection,schema);

export default usersModel;