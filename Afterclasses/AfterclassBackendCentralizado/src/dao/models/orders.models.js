import mongoose from "mongoose"

export default class Order {

    static get collection() {
        return 'Orders'
    }

    static get schema() {
        return {
            number:Number,
            business: {
                type: mongoose.SchemaTypes.ObjectId,
                ref:'Business'
            },
            user: {
                type: mongoose.SchemaTypes.ObjectId,
                ref:'Users'
            },
            status:String,
            products:[],
            totalPrice:Number
        }
    }
}