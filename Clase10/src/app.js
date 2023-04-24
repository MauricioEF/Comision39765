import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';

const app = express();

const server = app.listen(8080,()=>console.log("Listening on 8080"))

app.use(express.static(`${__dirname}/public`))

//Éste será mi server de sockets
const io  = new Server(server);

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use('/',viewsRouter);




const logs = [];
//on es el ESCUCHADOR DE EVENTOS
io.on('connection', socket =>{
    console.log("Nuevo cliente conectado");
    socket.emit('logs',logs);
    socket.on('message',data=>{//La data aquí es el
        logs.push({id:socket.id,message:data})
        //si hago socket.emit, se le envía sólo a ese socket
        // socket.emit('logs',data);
        io.emit('logs',logs);
    })
})