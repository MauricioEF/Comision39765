import express from 'express';
import paymentsRouter from './routes/payments.router.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/payments',paymentsRouter);

app.listen(8080,()=>console.log('listening'))