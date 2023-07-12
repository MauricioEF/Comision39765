export default class UserManager {
    constructor() {
        this.users = [];
    }

    getUsers = () =>{
       //LEYENDO EL ARCHIVO
    }

    saveUser = (user) => {
        this.users.push(user);
        return user;
    }

}
