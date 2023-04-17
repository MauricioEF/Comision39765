import express from 'express';


const app = express();

app.use(express.json());

const server = app.listen(8080,()=>console.log("Listening on 8080"));

let pets = [];

app.get('/pets',(req,res)=>{
    res.send(pets);
})

app.post('/pets',(req,res)=>{
    const pet = req.body;
    pets.push(pet);
    res.send({status:"success",message:"Mascota insertada"});
})

app.put('/pets/:pname',(req,res)=>{
    const name = req.params.pname;
    const pet = req.body;
    const petIndex = pets.findIndex(pet=>pet.name===name);
    if(petIndex===-1) return res.status(404).send({status:"error",error:"Pet not found"})
    pets[petIndex] = pet;
    res.send({status:"success",message:"Pet updated"})
})

app.delete('/pets/:pname',(req,res)=>{
    const name = req.params.pname;
    const petIndex = pets.findIndex(pet=>pet.name===name);
    if(petIndex ===-1) return res.status(404).send({status:"error",error:"Cannot delete an unexistent pet"})
    pets.splice(petIndex,1);
    res.send({status:"success",message:"Pet deleted"})
})

app.get('/person',(req,res)=>{

})
app.post('/person',(req,res)=>{

})
app.put('/person',(req,res)=>{
    
})

app.delete('/person',(req,res)=>{
    
})



app.get('/papa',(req,res)=>{
    try{
        const nombre = req.query.nombre;
        if(!nombre) return res.status(400).send({error:"Falta el nombre"});
        res.sendStatus(200)
    }catch(error) {
        res.status(500).send({error:"Error interno del servidor, pongase en contacto con el desarrollador"})
    }
})


