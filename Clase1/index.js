//DECLARAR UNA FUNCIÓN
function papaConQueso (nombre) {
    const a = {
        nombre:nombre,
        edad:26
    }
    
    Object.freeze(a);
    
    //ENUMERADORES Y DICCIONARIOS PRINCIPALMENTE
    
    a.estatura = 1.70;
    
    console.log(a);
    
}

//INVOCAR, EJECUTAR, O MANDAR A LLAMAR UNA FUNCIÓN

papaConQueso("Maricarmen");
papaConQueso("Maricarmen");
papaConQueso("Maricarmen");
papaConQueso("Maricarmen");
papaConQueso("Maricarmen");
papaConQueso("Maricarmen");
papaConQueso("Maricarmen");


// //ARROW FUNCTION O FUNCIÓN FLECHA

// const funcionFeliz = (nombre) =>{
//     const a = {
//         nombre:nombre,
//         edad:26
//     }
    
//     Object.freeze(a);
    
//     //ENUMERADORES Y DICCIONARIOS PRINCIPALMENTE
    
//     a.estatura = 1.70;
    
//     console.log(a);
// }

// funcionFeliz("Carlos")