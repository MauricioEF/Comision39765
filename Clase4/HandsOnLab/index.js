import UserManager from "./managers/UserManager.js";

const userManager = new UserManager();

const context = async() =>{
    const test = await userManager.getUsers();
    console.log(test);
    let testUser = {
        first_name:"Juan",
        last_name:"Ledesma",
        age:21
    }
    await userManager.createUser(testUser);

    const newUsers = await userManager.getUsers();
    console.log(newUsers);
}

context();