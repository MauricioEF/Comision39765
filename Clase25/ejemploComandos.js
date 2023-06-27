import {Command} from 'commander';

const program = new Command();
program
.option('-d','Variable para debuggear',false)
.option('-p <port>','Puerto del servidor',8080)
.option('--mode <mode>','Modo de trabajo','production')
.requiredOption('-u <user>','Usuario que llamó el script')
.option('-l, --letters [letters...]','letras')
.option('--admin','Correo del admin')

program.parse();

console.log('Options: ',program.opts());
console.log('Args: ', program.args);