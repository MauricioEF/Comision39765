const form = document.getElementById('restoreRequestForm');
const text = document.getElementById('message');

form.addEventListener('submit',async(evt)=>{
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    const response = await fetch('/api/sessions/restoreRequest',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    })
    
    const json =await response.json();
    if(json.status==="success"){
        text.innerHTML = "Se ha enviado un correo de verificación"
    }else{
        text.innerHTML = json.error
    }
})