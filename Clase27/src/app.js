import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({
    origin:'http://127.0.0.1:5500'
}));


app.get('/',(req,res)=>{
    res.send({message:"HOLA! Aquí tu respuesta"});
})

app.listen(8080,()=>console.log("Listening"))