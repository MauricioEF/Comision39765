export default class UserManager {
    constructor() {
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