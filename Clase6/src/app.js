import express from 'express';
//importarías aquí tu productManager
const app = express();

app.get('/papa',(request,response)=>{
    response.send('Hola express');
})

app.get('/bienvenida',(request,response)=>{
    response.send(`<h1 style="color:red;">Bienvenido</h1>`)
})

app.get('/user',(request,response)=>{
    const user = {
        first_name:"Mau",
        last_name:"Espinosa",
        age:26
    }
    response.send(user);
})

app.get('/numbers',(request,response)=>{
    response.send({price:2300});
})

app.get('/pruebarequest',async(req,res)=>{
    console.log(req);
    // await aquiUsoMiManager
    res.send(`ok`)
})

app.get('/users/:name',(req,res)=>{
    console.log(req.params);
    const users =  [
        {
            name:"papa",
            pet:"dog"
        },
        {
            name:"papo",
            pet:"cat"
        }
    ]
    const user = users.find(u=>u.name===req.params.name)
    res.send(user);
})

app.get('/users2',(req,res)=>{
    console.log(req.query);
    // const validQueries = ['name','pet'];
    const users =  [
        {
            name:"papa",
            pet:"dog"
        },
        {
            name:"papo",
            pet:"cat"
        }
    ]
    const search = Object.keys(req.query)[0];
    console.log(search);
    
    const user = users.find(u=>u[search]===req.query[search]);
    if(!user) return res.send(`Usuario no encontrado`)
    res.send(user)
})


app.listen(8080,()=>console.log('Listening on PORT 8080'))