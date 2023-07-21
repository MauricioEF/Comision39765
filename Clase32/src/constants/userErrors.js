    export const userErrorIncompleteValues = (user) =>{
        return `Uno o más parámetros obligatorios no fueron proporcionados:
        Propiedades obligatorias:
        * firstName: se esperaba una cadena definida, y se recibió ${user.firstName};
        * email: se esperaba una cadena definida, y se recibió ${user.email};
        * password: se esperaba una cadena definida, y se recibió ${user.password};
        `
    }