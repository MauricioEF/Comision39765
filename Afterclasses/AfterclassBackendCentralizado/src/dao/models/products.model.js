
export default class Product {

    static get collection() {
        return "Products"
    }

    static get schema() {
        return {
            title:String,
            description:String,
            price:Number
        }
    }
}