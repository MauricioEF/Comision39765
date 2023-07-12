import mongoose from 'mongoose';
import config from '../config/config.js';

//A partir de esa variable, definirá qué DAO tomar.
export default class PersistenceFactory {
    static async getPersistence() {
        let usersDAO;
        console.log(config);
        switch(config.PERSISTENCE) {
            case "MEMORY":
                //Estoy importando el archivo SOLO cuando lo necesite.
                const {default: MemoryDAO} =  await import('./Memory/UserManager.js')
                usersDAO = new MemoryDAO();
                break;
            case "FS":

                break;
            case "SQL":
                break;
            case "MONGO":
                mongoose.connect(config.MONGO_URL)
                const {default: MongoDAO} = await import('./Mongo/UserManager.js')
                usersDAO = new MongoDAO();
                break;
        }
        return usersDAO;
    }

}