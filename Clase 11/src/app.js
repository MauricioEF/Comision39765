import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';

const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`Listening on 8080`));

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',viewsRouter);

const io = new Server(server);

const messages = [];
io.on('connection',socket=>{
    socket.emit('logs',messages);
    socket.on('message',data=>{
        console.log(data);
        messages.push(data);
        io.emit('logs',messages);
    })
    socket.on('authenticated',data=>{
        socket.broadcast.emit('newUserConnected',data);
    })
})