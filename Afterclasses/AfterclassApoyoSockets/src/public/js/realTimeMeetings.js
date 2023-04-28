const socket = io();

socket.on('meetings',data=>{
    const finalContent = document.getElementById('meetingsContent');
    let content= "";
    data.forEach(meeting=>{
        content+=`${meeting.title} --- ${meeting.hour} --- ${meeting.status} <br/>`
    })
    finalContent.innerHTML = content;
})