import cartsModel from "./models/carts.js";

export default  class CartManager {

    getCartBy = params => cartsModel.findOne(params).lean();
    createCart = () => cartsModel.create({products:[]});
    updateCart = (id,cart) => cartsModel.findByIdAndUpdate(id,{$set:cart})
    
}