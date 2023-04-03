const fs = require('fs');

const fecha = new Date().toLocaleDateString();
const hora = new Date().toLocaleTimeString();

console.log(fecha);
console.log(hora);

fs.writeFile('./desafio.txt',`Fecha: ${fecha} ; Hora: ${hora}`,(error)=>{
    if(error){
        console.log(error);
        return;
    }
    fs.readFile('./desafiaaaaaaa.txt','utf-8',(error,content)=>{
        if(error){
            console.log("Error de lectura");
            return;
        }

        console.log(content);
    })
})

// try{
//     if(papotas){
//         return;
//     }
// }catch(error){
//     console.log("Errorcito");
// }