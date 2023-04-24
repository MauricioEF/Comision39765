const socket = io();

const input = document.getElementById('textbox');
const logs = document.getElementById('logs');

input.addEventListener('keyup',evt=>{
    let {key} = evt;
    if(key==="Enter"){
        socket.emit('message',input.value);
        input.value=''
    }
})

socket.on('logs',data=>{
    let messagesLogs = '';//Éste se pega al final del HTML
    data.forEach(log=>{
        messagesLogs += `${log.id} dice: ${log.message} <br/>`
    })
    logs.innerHTML = messagesLogs
})