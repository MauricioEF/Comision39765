import mongoose from "mongoose"

export default class User {

    static get collection() {
        return 'Users'
    }

    static get schema() {
        return {
            name:String,
            email:String,
            role:String,
            orders: [
                {
                    type:mongoose.SchemaTypes.ObjectId,
                    ref:'Orders'
                }
            ]
        }
    }
}

