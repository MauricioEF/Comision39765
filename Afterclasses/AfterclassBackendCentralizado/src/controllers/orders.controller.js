import { businessService, ordersService, usersService} from "../services/repositories.js";

const getOrders = async(req,res) =>{
    const orders = await ordersService.getAll();
    res.send({status:"success",payload:orders})
}

const getOrderById = async(req,res) =>{
    res.send("Get Order by Id");
}

const saveOrder = async(req,res) =>{
    const {user,business,products} = req.body;
    const resultUser = await usersService.getBy({_id:user});
    const resultBusiness = await businessService.getBy({_id:business});
    let actualProducts = resultBusiness.products.filter(product=>products.includes(product.id))
    const totalPrice = actualProducts.reduce((accumulator,previous)=>{
        accumulator+=previous.price
    },0);
    const orderNumber = Date.now() * Math.floor(Math.random()*10000+1);
    const order = {
        number:orderNumber,
        business,
        user,
        status:"pending",
        products:actualProducts.map(product=>({
            name: product.name,
            price:product.price
        })),
        totalPrice
    }
    const orderResult = await ordersService.createOrder(order);
    resultUser.orders.push(orderResult._id);
    await usersService.update(user,{orders:resultUser.order})
    res.send({status:"success",payload:orderResult})
}


const completeOrder = async(req,res) =>{
    //¿Cómo completas la orden?
    //Cuando se completa la orden, ¿qué ocurre con el usuario?
    //Cuando se completa la orden, ¿qué ocurre con el negocio?
}

export default {
    getOrderById,
    getOrders,
    saveOrder
}