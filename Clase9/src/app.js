import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

import viewsRouter from './routes/views.router.js';
import userRouter from './routes/users.router.js';

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use('/',viewsRouter);
app.use('/api/users',userRouter);

app.listen(8080,()=>console.log("listening on 8080"))