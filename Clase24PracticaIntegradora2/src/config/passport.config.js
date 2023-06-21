import { Strategy, ExtractJwt } from 'passport-jwt';
import local from 'passport-local';
import passport from 'passport';

import { usersService } from '../dao/mongo/Managers/index.js';
import { createHash, validatePassword } from '../services/auth.js';

import { cookieExtractor } from '../utils.js';

const LocalStrategy = local.Strategy;
const JWTStrategy = Strategy;

const initializePassportStrategies = () => {
  passport.use(
    'register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, email, password, done) => {
        try {
            const {firstName,lastName,role} = req.body;
            const exists = await usersService.getUserBy({email});
            if(exists)
                return done(null,false,{message:"User already exists"})
            const hashedPassword = await createHash(password);
            const newUser = {
                name: `${firstName} ${lastName}`,
                email,
                role,
                password:hashedPassword
            }
            const result = await usersService.createUser(newUser);
            return done(null,result);
        } catch (error) {
            return done(error);
        }
      }
    )
  );
  passport.use('login', new LocalStrategy({usernameField:'email'},async(email,password,done)=>{
    let resultUser;
    try {
        if(email==="admin@admin.com"&&password==="123"){
            //Acaba de entrar como SUPER ADMIN
            resultUser = {
                name:"Admin",
                id:0,
                role:'superadmin'
            }
            return done(null,resultUser);
        }
        const user = await usersService.getUserBy({email});
        if(!user) return done(null,false,{message:"User not found"});
        const isValidPassword = await validatePassword(password,user.password);
        if(!isValidPassword) return done(null, false,{message:"Incorrect credentials"});
        //El usuario ya existe y sí es la contraseña
        resultUser ={
            name:user.name,
            id:user._id,
            role:user.role
        }
        return done(null, resultUser);
    } catch (error) {
        return done(error);
    }
  }))

  passport.use('jwt', new JWTStrategy({
    jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey:'jwtSecret'
  },async(payload,done)=>{
    try {
        return done(null,payload);
    } catch (error) {
        return done(error);
    }
  }))

};

export default initializePassportStrategies;
