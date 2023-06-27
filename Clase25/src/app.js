import express from 'express';
import config from  './config.js';
import {fork}  from 'child_process';
import os from 'os';

const app = express();
const PORT  = config.app.PORT;
console.log(`Padre en proceso con Id ${process.pid}`)
console.log(os.cpus().length)

console.log(`Conectando a la base de datos: ${config.mongo.URL}`)

let contador = 0;

function operacionPesada() {
    let suma = 0 ;
    for(let i=0;i<5e9;i++){
        suma+=i;
    }
    return suma;
}

app.get('/operacion',(req,res)=>{
    //La solución es, correrlo como otro proceso.
    const result = operacionPesada();
    res.send(`Resultado: ${result}`)
})

app.get('/operacionForkeada',(req,res)=>{
    //primero, genero a mi hijo.
    const childProcess = fork('./src/operacionPesada.js');
    //En este momento tengo a mi hijo REFERENCIADO.
    //emit es el equivalente para enviar en SOCKETS
    childProcess.send('Ejecútate plox')
    childProcess.on('message',val=>{
        res.send(`Resultado del proceso forkeado: ${val}`)
    })
    
})

app.get('/contar',(req,res)=>{
    res.send(`Contador en: ${++contador}`);
})

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))



//NODEJS Tiene ASYNC, pero su event loop siempre es single threaded