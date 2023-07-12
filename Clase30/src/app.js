import express from 'express';
import nodemailer from 'nodemailer';
import twilio from 'twilio';


const app = express();

const APP_EMAIL = "ing.mauricioespinosa.tutorias@gmail.com";
const APP_PASSWORD = "okbgrdzofrzowief";

const TWILIO_NUMBER = "+16204904205";
const TWILIO_SID = "ACcfb9aec66332724e859cd40d9f99db83";
const TWILIO_TOKEN = "c395d851c516b491541db13d15c8b411";


//Generar el vínculo entre el servicio seleccionado y mi herramienta
const transport = nodemailer.createTransport({
    service:'gmail',
    port:587,
    auth:{
        user:APP_EMAIL,
        pass:APP_PASSWORD
    }
})

//Twilio ocupa inicializar al cliente
const twilioClient = twilio(TWILIO_SID,TWILIO_TOKEN);


app.get('/mail',async(req,res)=>{
    const result = await transport.sendMail({
        from:'Profe mau <ing.mauricioespinosa.tutorias@gmail.com>',
        to:'ing_mauricioespinosa@hotmail.com',
        subject:'Conóceme, contrátame porfas',
        html:`
        <div>
        <h1>¡Alto ahí, esta es una prueba!</h1>
        <p>Hola, si recibiste este correo, es porque vas a contratarme, adjunto foto de perfil</p>
        <img src="cid:perfilbonito"/>
        </div>
        `,
        attachments:[
            {
                filename:'Curriculum.pdf',
                path:'./src/docs/cv.pdf'
            },
            {
                filename:'perfil.jpg',
                path:'./src/img/perritoDeprimido.jpg',
                cid:'perfilbonito'
            }
        ]
    })

    res.send({status:"success",payload:result})
})



app.get('/sms',async(req,res)=>{
    const clientNumber = "+525567444717";
    const result = await twilioClient.messages.create({
        body:'SMS de prueba feliz',
        from:TWILIO_NUMBER,
        to:clientNumber
    })
    res.send({status:"success",payload:result})
})


app.listen(8080,()=>console.log("Listening"));

