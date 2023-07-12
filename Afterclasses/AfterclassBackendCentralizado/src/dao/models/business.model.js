
export default class Business {

    static get collection() {
        return 'Business'
    }
    
    static get schema() {
        return {
            name:String,
            products:[]
        }
    }
}