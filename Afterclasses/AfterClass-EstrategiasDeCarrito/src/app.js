import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js';

const app = express();

const connection = mongoose.connect("mongodb+srv://CoderUser:123@clustercitofeliz.m6oxtjj.mongodb.net/basepapaqueso?retryWrites=true&w=majority");

app.use(express.json());
app.use(cookieParser());

app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);




app.listen(8080,()=>console.log("Listening"))