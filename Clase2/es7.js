let valoresBase = [1,2,3,4,5,6];
                // 0,1,2,3,4,5
let nuevosValores = valoresBase.map((numero,indice)=>numero**indice);

console.log(nuevosValores);

let nombres = ['Juan', 'Lucas', 'Maria', 'Ana', 'Humberto'];

if(nombres.includes('Camilo')){
    console.log("Camilo sí está contemplado dentro del grupo");
}
else{
    console.log('Camilo no está contemplado dentro del grupo');
}