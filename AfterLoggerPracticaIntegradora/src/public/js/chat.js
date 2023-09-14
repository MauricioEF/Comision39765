const socket = io({
    autoConnect:false
});
const chatBox = document.getElementById('chatBox');

let user;

Swal.fire({
    title:"Identifícate",
    text:"Para acceder al chat, coloca tu username",
    icon:"question",
    input:"text",
    inputValidator: (value) =>{
        return !value && '¡Necesitas identificarte antes de entrar!'
    },
    allowOutsideClick:false,
    allowEscapeKey:false
}).then(result=>{
    user = result.value;
    socket.connect()
    socket.emit('chat:newParticipant',user)
})

chatBox.addEventListener('keyup',evt=>{
    if(evt.key==="Enter"){
        if(chatBox.value.trim().length>0){
            socket.emit('chat:message', {user,message:chatBox.value.trim()})
        }
    }
})


socket.on('chat:messageLogs',data=>{
    const logs = document.getElementById('logs');
    let message = "";
    data.forEach(log=>{
        message+= `${log.user} dice: ${log.message} <br/>`
    })
    logs.innerHTML = message;
})

socket.on('chat:newConnection',data=>{
    Swal.fire({
        toast:true,
        position: 'top-end',
        showConfirmButton: false,
        timer:2000,
        title:`${data} se unió al chat`,
        icon:"success"
    })
})