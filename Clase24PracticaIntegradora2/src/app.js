import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';

import viewsRouter from './routes/views.router.js';
import companiesRouter from './routes/companies.router.js';
import SessionsRouter from './routes/Sessions.router.js';

import registerChatHandler from './listeners/chatHandler.js';

import initializePassportStrategies from './config/passport.config.js';
import __dirname from './utils.js';


const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = new Server(server);
const connection = mongoose.connect("mongodb+srv://CoderUser:123@clustercitofeliz.m6oxtjj.mongodb.net/ERPSystem?retryWrites=true&w=majority")

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
initializePassportStrategies();

const sessionsRouter = new SessionsRouter();

app.use('/',viewsRouter);
app.use('/api/companies',companiesRouter);
app.use('/api/sessions',sessionsRouter.getRouter());

io.on('connection',socket=>{
    registerChatHandler(io,socket);
})