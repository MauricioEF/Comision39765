import { Command } from 'commander';
const program = new Command();
program.option('-n, --numbers [numbers...]', 'números');
program.parse();

const numbers = program.opts().numbers;

process.on('uncaughtException', (error) => {
  //¿Para qué me serviría?
  //Cerrar conexiones de DB
  console.log(error.stack);
  process.exit(error.code);
});

process.on('exit',code =>{
    console.log(code);
})

console.log('Inicio del proceso');
console.log(numbers);

if (!numbers) {
  // throw new Error('Sin argumentos');
  const error = new Error('Sin argumentos');
  error.code = -4;
  error.stack = {
    argumentosEnviados: numbers || [],
  };
  throw error;
}

console.log('Parsea los números');

const parsedNumbers = numbers.map((candidate) => {
  const possibleNumber = parseInt(candidate);
  if (isNaN(possibleNumber)) {
    const error = new Error('Invalid Types');
    error.code = -5;
    const types = numbers.map(candidate=>{
        const possibleNumber = parseInt(candidate)
        if(!isNaN(possibleNumber)){
            return "number"
        }else{
            return "string"
        }
    })
    error.stack = {
        description: "Tipos de argumentos inválidos",
        args: numbers,
        tipos: types
    }
    throw error;
  }else{
    return possibleNumber
  }
});


console.log(parsedNumbers);
