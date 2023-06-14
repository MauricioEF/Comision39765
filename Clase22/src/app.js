import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/session.router.js';
import initializePassportStrategies from './config/passport.config.js';

import __dirname from './utils.js';

const app = express();

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

const connection = mongoose.connect("mongodb+srv://CoderUser:123@clustercitofeliz.m6oxtjj.mongodb.net/modulo2?retryWrites=true&w=majority")

initializePassportStrategies();

app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(8080,()=>console.log("Listening"));