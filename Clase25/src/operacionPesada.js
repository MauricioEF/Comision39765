process.on('message',_=>{
    console.log(`Hijo con pid: ${process.pid}`)
    let suma = 0 ;
    for(let i=0;i<5e9;i++){
        suma+=i;
    }
    process.send(suma);
})
