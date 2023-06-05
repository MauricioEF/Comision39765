import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';


export const createHash = async(password) => {
    //Generar los Salts
    const salts = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salts);
}
export const validatePassword = (password, hashedPassword) => bcrypt.compare(password,hashedPassword);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;