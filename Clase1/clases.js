class Persona {
    constructor(nombre, apellido, edad) {//Se ejecuta siempre al crear una nueva persona
        //Propiedades
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.especie = "Humano";
        this.amigos = [];
    }

    //Métodos = Acciones
    saludar = () => {
        console.log(`¡Hola, soy ${this.nombre}!`)
    }
}

const persona1 = new Persona("Mauricio","Espinosa",26);

const persona2 = new Persona("Sebas","Sonenblum",26);

persona1.saludar();

persona2.saludar();