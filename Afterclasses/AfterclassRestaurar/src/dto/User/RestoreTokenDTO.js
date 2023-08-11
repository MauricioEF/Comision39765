export default class RestoreTokenDTO {
  static getFrom = (user) => {
    return {
      email: user.email,
    };
  };
}
