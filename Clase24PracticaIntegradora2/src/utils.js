import {fileURLToPath} from 'url';
import { dirname } from 'path';

export const cookieExtractor = (req) =>{
    let token = null;
    if(req&&req.cookies) {
        token = req.cookies['authToken']
    }
    return token;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
