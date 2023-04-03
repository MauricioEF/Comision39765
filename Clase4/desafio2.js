import fs from 'fs';
import { Blob } from 'buffer';

const context = async() =>{
    
    try {
        const content = await fs.promises.readFile('./package.json','utf-8');
        const object = JSON.parse(content);

        const resultObject = {
            stringifiedContent: content,
            objectContent :object,
            size: new Blob([content]).size
        }
        
        console.log(resultObject);
        await fs.promises.writeFile('./info.json',JSON.stringify(resultObject,null,'\t'))

    } catch (error) {
        
    }

}


context();