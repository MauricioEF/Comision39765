import fs from 'fs';

const context = async () => {
    try {
        await fs.promises.writeFile('./archivoPromesa.txt', 'Hola promesa');
        const content = await fs.promises.readFile('./archivoPromesa.txt', 'utf-8');
        console.log(content);
        await fs.promises.appendFile('./archivoPromesa.txt',' Nuevo texto');
        const newContent = await fs.promises.readFile('./archivoPromesa.txt', 'utf-8');
        console.log(newContent);
        await fs.promises.unlink('./archivoPromesa.txt');
    } catch (error) {
        console.log(error);
    }
}

context();