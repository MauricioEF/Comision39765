import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';


export const generateToken = (user) =>{
    const token = jwt.sign(user,"jwtSecret", {expiresIn:'24h'});
    return token;
}

export const passportCall = (strategy,options = {}) =>{
    return async(req,res,next) =>{
        passport.authenticate(strategy,(error,user,info)=> {
            if(error) return next(error);
            if(!user) {
                if(options.redirect) return res.redirect(options.redirect);
                return res.status(401).send({status:"error",error:info.message?info.message:info.toString()})
            }
            req.user = user;
            next();
        })(req,res,next);
    }
}

export const cookieExtractor = (req) =>{
    let token = null; //Aquí va a venir el token... Si lo encuentra
    if(req&&req.cookies) {
        token = req.cookies['authToken']
    }
    return token;
}


export const createHash = async(password) => {
    //Generar los Salts
    const salts = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salts);
}
export const validatePassword = (password, hashedPassword) => bcrypt.compare(password,hashedPassword);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;