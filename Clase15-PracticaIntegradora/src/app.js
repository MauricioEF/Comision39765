import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import viewsRouter from './routes/views.router.js';
import companiesRouter from './routes/companies.router.js';

import registerChatHandler from './listeners/chatHandler.js';

import __dirname from './utils.js';


const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = new Server(server);
const connection = mongoose.connect("mongodb+srv://CoderUser:123@clustercitofeliz.m6oxtjj.mongodb.net/ERPSystem?retryWrites=true&w=majority")

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));

app.use('/',viewsRouter);
app.use('/api/companies',companiesRouter);

io.on('connection',socket=>{
    registerChatHandler(io,socket);
})