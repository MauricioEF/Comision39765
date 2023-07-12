import TokenDTO from "../dtos/user/TokenDTO";
import { userService } from "../services/repositories";
const login = async (req,res) =>{

    //ME LOGUEO
    //Generarle un token
    const DBUser  = await userService.find();
    const user = new TokenDTO(DBUser);
    
}