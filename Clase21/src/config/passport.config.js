import passport from 'passport';
import local from 'passport-local';
import userModel from '../dao/mongo/user.js';
import { createHash, validatePassword } from '../utils.js';

const LocalStrategy = local.Strategy; // UNA ESTRATEGIA LOCAL SIEMPRE SE BASA EN EL USERNAME + PASSWORD

const initializePassportStrategies = () => {
  passport.use(
    'register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name } = req.body;
          //Número 1! Corrobora si el usuario ya existe.
          const exists = await userModel.findOne({ email });
          //done lo que quiere hacer es DEVOLVERTE un usuario en req.user;
          if (exists)
            return done(null, false, { message: 'El usuario ya existe' });
          //Número 2! Si el usuario no existe, ahora sí ENCRIPTAMOS SU CONTRASEÑA
          const hashedPassword = await createHash(password);
          //Número 3! Construimos el usuario que voy a registrar
          const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
          };
          const result = await userModel.create(user);
          //Si todo salió bien, Ahí es cuando done debe finalizar bien.
          done(null, result);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        //PASSPORT SÓLO DEBE DEVOLVER AL USUARIO FINAL, ÉL NO ES RESPONSABLE DE LA SESIÓN
        if (email === 'admin@admin.com' && password === '123') {
          //Desde aquí ya puedo inicializar al admin.
          const user = {
            id: 0,
            name: `Admin`,
            role: 'admin',
            email: '...',
          };
          return done(null, user);
        }
        let user;
        //Número 1!!!!! buscar al usuario, ¿existe?
        user = await userModel.findOne({ email }); //Sólo busco por mail
        if (!user)
          return done(null, false, { message: 'Credenciales incorrectas' });

        //Número 2!!!! si sí existe el usuario, VERIFICA SU PASSWORD ENCRIPTADO

        const isValidPassword = await validatePassword(password, user.password);
        if (!isValidPassword)
          return done(null, false, { message: 'Contraseña inválida' });

        //Número 3!!! ¿El usuario existe y SÍ PUSO SU CONTRASEÑA CORRECTA? Como estoy en passport, sólo devuelvo al usuario

        user = {
          id: user._id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: user.role,
        };
        return done(null, user);
      }
    )
  );

  passport.serializeUser(function (user, done) {
    return done(null, user.id);
  });
  passport.deserializeUser(async function (id, done) {
    if(id===0){
        return done(null,{
            role:"admin",
            name:"ADMIN"
        })
    }
    const user = await userModel.findOne({ _id: id });
    return done(null, user);
  });

};
export default initializePassportStrategies;
