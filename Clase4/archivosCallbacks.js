const fs = require('fs');

const productos = [
    {
        title: "producto1",
        price: 123123
    }
]

fs.writeFile('./productosCallback.json',JSON.stringify(productos),(error)=>{
    if(error){
        console.log(error);
        return;
    }
    console.log("Archivo escrito con éxito, leyendo archivo");
    fs.readFile('./productosCallback.json','utf-8',(error,content)=>{
        if(error){
            console.log(error);
            return;
        }
        console.log(content);
        fs.appendFile('./productosCallback.json','a',(error)=>{
            if(error){
                console.log(error);
                return;
            }
            fs.readFile('./productosCallback.json','utf-8',(papa,content)=>{
                if(error){
                    console.log(papa);
                    return;
                }
                console.log(content);
            })
        })
    })
})