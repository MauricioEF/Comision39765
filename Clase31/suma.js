// const suma = (...nums) =>{
//     if(nums.length===0) return 0;
//     let result = 0;
//     for(let i=0;i<nums.length;i++){
//         if(typeof nums[i] !== "number"){
//             return null;
//         }
//         else{
//             result+=nums[i]
//         }
//     }
//     return result;
// }

// const suma = (...nums) => {
//     if(nums.length===0) return 0;
//     const hasADifferentType = nums.some(num=>typeof num !=="number");
//     if(hasADifferentType) return null;
//     const result = nums.reduce((prev,current)=>prev+current);
//     return result;
// }

//Escribimos las pruebas para que fallen
//Etapa de contemplación de inputs, casos, contextos.

let testsPasados = 0;
let testsTotales = 4;

//Comenzamos a escribir las pruebas
console.log("Test 1. La función deberá devolver null si algún parámetro NO es numérico");
let resultTest1 = suma("2",2);
if(resultTest1===null){
    console.log("Test 1 Pasado");
    testsPasados++;
}
else console.log(`Test 1 No pasado: Se esperaba que el resultado fuera null, pero se recibió ${resultTest1}`)

console.log("Test 2. La función deberá devolver 0 si no nos pasan ningún parámetro");
let resultTest2 = suma();
if(resultTest2===0){
    console.log("Test 2 Pasado");
    testsPasados++;
}
else console.log(`Test 2 No pasado: Se esperaba que el resultado fuera 0, pero se recibió ${resultTest2}`);

console.log("Test 3. La suma debe resolverse correctamente si los datos son correctos");
let resultTest3 = suma(2,3);
if(resultTest3===5){
    console.log("Test 3 Pasado");
    testsPasados++;
}
else console.log(`Test 3 No pasado: Se esperaba que el resultado fuera 5, pero se recibió ${resultTest3}`);

console.log("Test 4. La suma debe poder recibir n parámetros");
let resultTest4 = suma(1,2,3,4,5);
if(resultTest4===15){
    console.log("Test 4 Pasado");
    testsPasados++;
}
else console.log(`Test 4 No pasado: Se esperaba que el resultado fuera 15, pero se recibió ${resultTest4}`);


if(testsPasados===testsTotales) console.log("Todos los tests han sido pasados con éxito");
else console.log(`Se han pasado ${testsPasados} tests de un total de ${testsTotales}`);