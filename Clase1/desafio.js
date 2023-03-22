class Contador {
    constructor(responsable) {
        this.responsable = responsable;
        this.conteo = 0;
    }
    static conteoGlobal = 0;

    getResponsable = () =>{
        return this.responsable;
    }
    contar = () =>{
        this.conteo++;//Súmale 1
        Contador.conteoGlobal++;
    }
    getCuentaIndividual = () =>{
        return this.conteo;
    }

    getCuentaGlobal = () =>{
        return Contador.conteoGlobal;
    }
}

const contador1 = new Contador("Carlos");
const contador2 = new Contador("Julia");
const contador3 = new Contador("Maricarmen");



contador1.contar();

console.log(contador1.getCuentaIndividual());

contador3.contar();
console.log(contador3.getCuentaIndividual());

contador2.contar();
contador2.contar();
contador2.contar();
contador2.contar();
console.log(contador2.getCuentaIndividual());
const contador4 =   new Contador('Pablo');

console.log(contador4.getCuentaGlobal());