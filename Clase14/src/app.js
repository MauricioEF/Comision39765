import express from 'express';
import mongoose from 'mongoose';

import usersRouter from './routes/users.js';

const app = express();
const connection = mongoose.connect('mongodb+srv://CoderUser:123@clustercitofeliz.m6oxtjj.mongodb.net/?retryWrites=true&w=majority')

app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.use('/api/users',usersRouter);

app.listen(8080,()=>console.log("Listening"))