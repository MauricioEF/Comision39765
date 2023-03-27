const objetoA = {
    peras:1,
    manzanas:1,
    banana:2,
    fresaA:1
}

const objetoB = {
    duraznos:2,
    uva:4,
    ciruela:6,
    fresaB:6
}


const objetoC = {
    ...objetoA,
    ...objetoB,
    fresa:10
}
console.log(objetoC);


const {peras,manzanas,...frutasRestantes} = objetoA; //EXTRAIGO SOLO LO QUE ME SIRVE

console.log(peras);

console.log(manzanas);

console.log(frutasRestantes);
