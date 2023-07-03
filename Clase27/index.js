import MongoSingleton from "./MongoSingleton.js";


//A UN SINGLETON NUNCA LO LLAMO CON new
const mongoInstance = MongoSingleton.getInstance();

const mongoInstance2 = MongoSingleton.getInstance();