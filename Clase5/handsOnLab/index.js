import UserManager from "./Managers/UserManager.js"

const userManager = new UserManager();

const context = async() =>{
    const testUser ={
        name : "Carlos",
        last_name:"Pelayes",
        password:"123"
    }
    await userManager.createUser(testUser);
    await userManager.validatePassword({
        name : "Carlos",
        },"1234")
}

context();