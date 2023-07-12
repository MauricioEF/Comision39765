export default class UserManager {
    constructor() {
        console.log("Ahora trabajaré con usuarios en memoria")
        this.users = [];
    }

    getUsers = () =>{
        return this.users;
    }

    saveUser = (user) => {
        this.users.push(user);
        return user;
    }

}