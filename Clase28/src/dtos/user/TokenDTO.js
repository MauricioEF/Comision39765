
export default class TokenDTO {
    constructor(user) {
        this.name = `${user.firstName}  ${user.lastName}`,
        role = user.role,
        id = user._id
    }
}