import express from 'express';
import usersRouter from './routes/users.js';

import attachLogger from './middlewares/logger.js';

const app = express();

app.use(attachLogger);


app.use('/api/users',usersRouter);


app.get('/simple',(req,res)=>{
    let sum = 0;
    for(let i=0;i<1000000;i++){
        sum+=i;
    }
    res.send({sum})
})

app.get('/complex',(req,res)=>{
    let sum = 0;
    for(let i=0;i<5e8;i++){
        sum+=i;
    }
    res.send({sum})
})

app.listen(8080, () => console.log('Listening'));
