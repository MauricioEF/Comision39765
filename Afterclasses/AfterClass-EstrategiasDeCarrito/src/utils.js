import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(user,'jwtToken',{
        expiresIn:'1d'
    });
}

export const auth = (req,res,next) =>{
    const token = req.cookies['authToken'];
    if(!token){
        return res.status(401).send({status:"error"})
    }
    const user = jwt.verify(token,'jwtToken');
    req.user = user;
    next();
}

export const auth2 = (req,res,next) =>{
    const token = req.cookies['authToken'];
    if(!token){
        req.user = false;
        return next();
    }
    const user = jwt.verify(token,'jwtToken');
    req.user = user;
    next();
}