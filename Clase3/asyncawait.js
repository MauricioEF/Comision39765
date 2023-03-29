const division = (dividendo,divisor) =>{
    return new Promise((resolve,reject)=>{
        if(divisor===0){
            reject('La operación no se puede realizar porque el divisor es 0')
        }else{
            resolve(dividendo/divisor);
        }
    })
}



const contexto = async() =>{
    try {
        const resultadoQueVieneDeUnaPromesa = await division(10,5);
        const resultadoAlterado = resultadoQueVieneDeUnaPromesa + 10 ;
        console.log(resultadoQueVieneDeUnaPromesa);
        return resultadoAlterado;
    } catch (error) {
        console.log(error);
    }
}

const superContexto = async() =>{
    console.log("Iniciando contexto");
    const resultadoDelContexto = await contexto();
    console.log("Contexto finalizado");

    console.log(resultadoDelContexto);
}

superContexto();