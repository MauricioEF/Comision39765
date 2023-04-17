import express from 'express';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';

import __dirname from './utils.js';

const app = express();

//Aquí comienza la petición


app.use(express.json());//Me permite leer jsons en las peticiones.
app.use(express.urlencoded({extended:true})); //Objetos codificados desde URL
app.use(express.static(`${__dirname}/public`));


// const miPrimerMiddleware = (req,res,next) =>{
//     const body = req.body;
//     if(body.user==="Benjamin") return res.status(403).send({status:"error",error:"No autorizado"});
//     next();
// }

// app.use(miPrimerMiddleware);

app.use('/api/users',usersRouter);
app.use('/api/pets', petsRouter);


app.listen(8080,()=>console.log("Listening"))