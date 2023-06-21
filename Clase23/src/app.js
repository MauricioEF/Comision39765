import express from 'express';
import dictionaryRouter from './routes/dictionary.router.js';
import petsRouter from './routes/pets.router.js';
import UserRouter from './routes/users.router.js';
import SessionsRouter from './routes/sessions.router.js';

const app = express();


const userRouter = new UserRouter();
const sessionsRouter = new SessionsRouter();


app.use('/api/dictionary',dictionaryRouter);
app.use('/api/pets',petsRouter);
app.use('/api/users',userRouter.getRouter());
app.use('/api/sessions',sessionsRouter.getRouter());


app.listen(8080,()=>console.log("Listening"))