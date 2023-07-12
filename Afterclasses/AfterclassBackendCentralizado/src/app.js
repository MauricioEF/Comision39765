import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';

import usersRouter from './routes/users.router.js';
import ordersRouter from './routes/orders.router.js';
import businessRouter from './routes/business.router.js';



const app = express();
const PORT = process.env.PORT||8080;

const connection = mongoose.connect("mongodb+srv://CoderUser:123@clustercitofeliz.m6oxtjj.mongodb.net/coderEatsfeliz?retryWrites=true&w=majority")

app.use(cors());

app.use(express.json());


app.use('/api/users',usersRouter);
app.use('/api/orders',ordersRouter);
app.use('/api/business',businessRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`));