class TicketManager {
    #baseProfitPrice = 1.15;
    constructor() {
        this.events = [];
    }
    getEvents = () => {
        return this.events;
    }

    addEvent = function ({name, place, price, capacity = 50, date = new Date().toLocaleDateString()}) { //Capacidad se agrega en 50 por defecto, y date en "hoy" por defecto
        if (!name || !place || !price) {//Evaluamos que el código no llegue vacío en sus variables principales
            console.log("Datos incompletos");
            return null;
        }
        const event = {//Unimos las variables que nos enviaron para crear el evento a insertar
            name,
            place,
            price: price * this.#baseProfitPrice,
            capacity,
            date,
            participants: []
        }
        if (this.events.length === 0) {//No hay eventos previos
            event.id = 1;
        } else {//Ya hay por lo menos un evento previo
            const lastEvent = this.events[this.events.length - 1] //Devuelve el último evento.
            event.id = lastEvent.id + 1;
        }
        //Ya que el evento ahora sí tiene un Id, lo inserto.
        this.events.push(event);
    }

    addParticipant = (eventId,userId) =>{
        const eventIndex = this.events.findIndex(event=>event.id===eventId); //Busca el index del evento acorde con un criterio
        console.log(eventIndex);
        if(eventIndex===-1) {//Significa que no encontró el evento
            console.log("Evento no encontrado");
            return null;
        }
        //A partir de aquí, ya sé que sí existe el evento.
        const alreadyRegistered = this.events[eventIndex].participants.includes(userId);
        if(alreadyRegistered){
            console.log("El usuario ya estaba registrado");
            return null
        }
        this.events[eventIndex].participants.push(userId);
        console.log("Usuario agregado con éxito");
    }
}

const ticketManager = new TicketManager()

const testEvent = {
    name:"After del profe",
    place:"Nether",
    price:1000,
}

ticketManager.addEvent(testEvent);

const testEvent2 = {
    name:"Recital",
    place:"Midgard",
    price:2000,
}

ticketManager.addEvent(testEvent2);

ticketManager.addParticipant(1,1);
ticketManager.addParticipant(1,1);
ticketManager.addParticipant(1,2);
ticketManager.addParticipant(1,4);
ticketManager.addParticipant(1,19);
ticketManager.addParticipant(1,30);
ticketManager.addParticipant(1,1);

console.log(ticketManager.getEvents());

