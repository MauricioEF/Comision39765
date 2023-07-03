import mongoose from 'mongoose';

export default class MongoSingleton {
    static #instance;
    constructor() {
        mongoose.connect('mongodb+srv://CoderUser:123@clustercitofeliz.m6oxtjj.mongodb.net/?retryWrites=true&w=majority')
    }

    static getInstance() {
        if(this.#instance){
            console.log("Ya tengo una instancia referenciada :) ");
            return this.#instance;
        }
        //Si llegué aquí, es porque no tenía ninguna instancia previa.
        this.#instance = new MongoSingleton();
        console.log("conectada primera instancia");
        return this.#instance;
    }

}