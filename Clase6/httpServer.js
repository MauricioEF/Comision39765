import http from 'http';

const server = http.createServer((request,response)=>{
    response.end(`Hola Backend ! :) `)
})

server.listen(8081,()=>{
    //¿Qué quieres que haga en cuanto comience a escuchar?
    console.log(`Server listening on PORT 8080`);
})