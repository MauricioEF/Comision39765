import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
// import  FileStore from 'session-file-store';

import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/session.router.js';
import __dirname from './utils.js';

const app = express();

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));

// const fileStorage = FileStore(session);
const connection = mongoose.connect("mongodb+srv://CoderUser:123@clustercitofeliz.m6oxtjj.mongodb.net/modulo2?retryWrites=true&w=majority")

app.use(session({
    // store: new fileStorage({path:`${__dirname}/sessions`, ttl: 15, retries:0 }),//time to live
    store: new MongoStore({
        mongoUrl:"mongodb+srv://CoderUser:123@clustercitofeliz.m6oxtjj.mongodb.net/modulo2?retryWrites=true&w=majority",
        ttl: 3600,
    }),
    secret:"CoderS3cretFelis",
    resave:false,
    saveUninitialized:false
}))


app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(8080,()=>console.log("Listening"));