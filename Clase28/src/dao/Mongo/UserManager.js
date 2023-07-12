import userModel from "./models/user.model.js";

export default class UserManager {
    constructor(){
        console.log("Ahora estoy trabajando con la base de MONGO")
    }

    getUsers = () =>{
        return userModel.find();
    }

    saveUser = (user) => {
        return userModel.create(user);
    }

}