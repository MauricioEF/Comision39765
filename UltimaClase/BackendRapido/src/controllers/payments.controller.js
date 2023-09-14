import PaymentsService from "../services/PaymentsService.js";



const mockCart = [
    { id: 1, name: "papas", price: 1000 },
    { id: 2, name: "queso", price: 500 },
    { id: 3, name: "hamburguesa", price: 1500 },
    { id: 4, name: "soda", price: 1000 },
    { id: 5, name: "golosinas", price: 800 }
]

const createPaymentIntent = async(req,res)=>{
    const {id} = req.query;
    //Busco el producto en la base
    const productRequested = mockCart.find(product=>product.id===parseInt(id));
    console.log(productRequested);
    if(!productRequested) return res.status(400).send({status:"error",error:"Product doesn't exist"});
    //El producto sí existe aquí, Vamos a crear un intento de pago (PaymentIntent)
    const paymentIntentInfo = {
        amount:productRequested.price, //Aquí colocarías EL TOTAL del carrito
        currency:'usd',
        metadata: {//Aquí guardas todos los datos que te podrían servir para relacionar al cliente con el pago
            orderDetails:JSON.stringify({
                [productRequested]:2,
            },null, '\t'),
            userId:'Un id de monguito',
            userEmail:'correo@correo.com',
        }
    }
    //Aquí ya necesitamos conectar con nuestra pasarela
    const paymentService = new PaymentsService();
    const result = await paymentService.createPaymentIntent(paymentIntentInfo)
    console.log(result);
    res.send({status:"success",payload:result})   
}

export default {
    createPaymentIntent
}