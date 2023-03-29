const suma = (numero1,numero2) =>{
    return new Promise((resolve,reject)=>{
        if(numero1===0||numero2===0) reject('Operación innecesaria');
        if(numero1+numero2 <0) reject('La suma sólo debe ser positiva')
        resolve(numero1+numero2);
    })
}

const restar = (num1, num2) => {
    return new Promise((resolve, reject) => {
        if(num1 == 0 || num2 == 0) return reject('Operacion invalida')
        const result = num1 - num2
        if (result < 0) return reject('Solo devuelve numeros positivos')

        return resolve(result)
    })
}

const multiplicacion = (num1,num2) =>{
    return new Promise((resolve,reject)=>{
        if(num1<0||num2<0) reject('Los factores no pueden ser negativos');
        const resultado = num1 * num2;
        if(resultado<0) reject('Sólo valores positivos dije!!!!')
        resolve(num1*num2)
    })
}

const dividir = (dividendo, divisor) => {
    return new Promise((resolve, reject) => {
        if(divisor == 0) reject('Division entre 0')
        else resolve(dividendo/divisor)
    })
}

const calculos = async() =>{
    try{
        const resultadoSuma = await suma(2,5);
        const resultadoResta = await restar(4,3);
        const resultadoMultiplicacion = await multiplicacion(2,5);
        const resultadoDivision = await dividir(10,3);
    
        console.log(resultadoSuma);
        console.log(resultadoResta);
        console.log(resultadoMultiplicacion);
        console.log(resultadoDivision);
    }catch(error){
        console.log(error);
    }
}
calculos();