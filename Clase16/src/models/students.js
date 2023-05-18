import mongoose from "mongoose";

const collection = "Students";

const schema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    gender:String,
    courses:{
        type:[
            {
                course:{
                    type:mongoose.SchemaTypes.ObjectId,
                    ref:'Courses'
                }
            }
        ],
        default:[]
    }
})

schema.pre('find',function(){
    this.populate('courses.course');
})


const studentsModel = mongoose.model(collection,schema);

export default studentsModel;