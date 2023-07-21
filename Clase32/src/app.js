import express from 'express';
import compression from 'express-compression';
import usersRouter from './routes/users.router.js';
import errorHandler from './middlewares/error.js'

const app = express();

// app.use(compression({
//     brotli:{enabled:true, zlib:{}}
// }));

app.use(express.json());

app.use('/api/users',usersRouter);


//Éste siempre va al final de tus routers y middlewares adicionales
app.use(errorHandler)

app.get('/pruebacompresion',(req,res)=>{
    let stringLarga = `Hola, soy una string, pero larga`;
    for(let i=0;i<5e4;i++){
        stringLarga+= `Hola, soy una string, pero larga`
    }
    res.send(stringLarga);
})


app.listen(8080,()=>console.log("Listening"))

