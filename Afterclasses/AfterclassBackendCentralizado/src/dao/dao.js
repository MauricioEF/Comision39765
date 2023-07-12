import mongoose from "mongoose";
import User from "./models/users.model.js";
import Order from "./models/orders.models.js";
import Business from "./models/business.model.js";
import Product from "./models/products.model.js";

export default class Dao {
    constructor() {

        //construyo los schemas
        const timestamps = {timestamps:true};

        const usersSchema = new mongoose.Schema(User.schema,timestamps);
        const ordersSchema = new mongoose.Schema(Order.schema,timestamps);
        const businessSchema = new mongoose.Schema(Business.schema,timestamps);
        const productsSchema = new mongoose.Schema(Product.schema,timestamps);

        //Ya tengo los schemas, inicializo los modelos

        this.models = {
            [User.collection]: mongoose.model(User.collection,usersSchema),
            [Order.collection]:mongoose.model(Order.collection,ordersSchema),
            [Business.collection]:mongoose.model(Business.collection,businessSchema),
            [Product.collection]:mongoose.model(Product.collection,productsSchema)
        }
    }

    evaluateModel = (model) => {
        if(!this.models[model]) throw new Error("Model not found in database")
    }

    get = (params,model) =>{//model significa "¿de cuál de todos los modelos quiero hacer el get"
        this.evaluateModel(model);
        return this.models[model].find(params);
    }

    getBy = (params,model) =>{
        this.evaluateModel(model);
        return this.models[model].findOne(params);
    }

    save = (document,model) =>{
        this.evaluateModel(model);
        return this.models[model].create(document);
    }

    update = (id,document,model) =>{
        this.evaluateModel(model);
        return this.models[model].findByIdAndUpdate(id,{$set:document})
    }

    delete = (id,model) =>{
        this.evaluateModel(model);
        return this.models[model].findByIdAndDelete(id);
    }

}