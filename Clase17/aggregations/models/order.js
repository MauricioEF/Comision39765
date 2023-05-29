import mongoose from 'mongoose';

const collection = 'Orders';

const schema = new mongoose.Schema({
    name:String,
    size:{
        type:String,
        enum:['small','medium','large'],
        default:'medium'
    },
    price: Number,
    quantity:Number,
    date:Date
})

const orderModel = mongoose.model(collection,schema);

export default orderModel;

