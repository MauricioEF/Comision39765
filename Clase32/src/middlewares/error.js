
export default (error,req,res,next) => { // Es nuestro salvador! Éste es el que define que NUNCA caiga el server
    console.log(error);
    res.status(error.status).send({status:"error",error:error.message})
}