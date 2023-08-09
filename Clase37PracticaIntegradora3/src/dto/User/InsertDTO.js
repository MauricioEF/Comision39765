
export default class UserInsertDTO {
    static getFrom = (user) =>{
        return {
            name: `${user.firstName} ${user.lastName}`,
            email:user.email,
            role:user.role,
            password:user.password
        }
    }
}