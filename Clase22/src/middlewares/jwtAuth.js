import jwt from 'jsonwebtoken';

export const authToken = (req, res, next) => {
    //En esta práctica vamos a tomarlo de los headers.

    const authHeader = req.headers.authorization;
    if(!authHeader) res.status(401).send({status:"error",error:"Not authenticated"})
    const token = authHeader.split(" ")[1];
    //Ya vi que sí existe el token... ¿Pero es válido?
    jwt.verify(token,'jwtSecret',(error,credentials) =>{
        if(error) return res.status(401).send({error:"Token inválido"});
        req.user = credentials.user;
        next();
    })
    
};
