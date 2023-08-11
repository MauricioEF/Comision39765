
export default class UserTokenDTO {
    static getFrom = user =>{
        return {
            name: user.name,
            id: user._id,
            role: user.role
        }
    }
}