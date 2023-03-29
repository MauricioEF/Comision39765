const division = (dividendo,divisor) =>{
    return new Promise((resolve,reject)=>{
        if(divisor===0){
            reject('La operación no se puede realizar porque el divisor es 0')
        }else{
            resolve(dividendo/divisor);
        }
    })
}







console.log("Iniciando operación de división");


division(1,2)
.then(resultado =>{
    return resultado+10
})
.then(siguienteResultado =>console.log(siguienteResultado))
.catch(error=>console.log(error)) //Si sale mal

console.log("Operación de división finalizada");