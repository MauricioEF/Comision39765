import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import viewsRouter from './routes/views.router.js';
import meetingsRouter from './routes/meetings.router.js';

import __dirname from './utils.js';

const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
const io = new Server(server);

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use((req,res,next)=>{
    //La intención será REFERENCIAR NUESTRO io
    req.io = io;
    next();
})

app.use('/',viewsRouter);
app.use('/api/meetings',meetingsRouter);


io.on('connection',socket=>{
    console.log('Socket conectado');
})